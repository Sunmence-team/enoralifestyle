import React, { useState } from "react";
import Contacthero from "../components/herosections/Contacthero";
import { assets } from "../assets/assests";
import { toast } from "sonner";

interface ContactResponse {
  message: string;
}

const Contact = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [postingMessage, setPostingMessage] = useState(false);

  const postContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostingMessage(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("authToken");
      const reqBody = {
        name: name,
        email: email,
        message: message,
      };
      const res = await fetch(`${baseUrl}/contact`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      const data: ContactResponse = await res.json();
      if (res.ok) {
        toast.success("Your message has been sent successfully");
      } else {
        toast.error(`Failed to send message. ${data.message}.`);
      }
    } catch (error) {
      const err = error as Error;
      if (
        err?.message?.includes("Unexpected token '<'") ||
        err?.message === "Failed to fetch"
      ) {
        return toast.error("An uexpected error occured while sending message");
      } else {
        toast.error(err?.message || "Error sending message");
      }
    } finally {
      setPostingMessage(false);
      setEmail("");
      setMessage("");
      setName("");
    }
  };
  return (
    <div>
      <Contacthero
        title="Contact Us"
        backgroundImage={assets.contact}
        height="h-[70vh]" // home page is taller
      />

      <div className="text-center mt-8">
        <h2 className="text-[30px] md:text-[50px] font-bold">
          Reach out to Us anytime
        </h2>
        <p className="font-semibold">
          Feel free to ask us any questions
        </p>
      </div>
      <form
        onSubmit={postContact}
        className="flex flex-col gap-6 items-center justify-center h-[50vh] "
      >
        <div className="w-full max-w-[810px] mx-auto px-4">
          {/* Inputs */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              type="text"
              placeholder="Fullname"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-(--primary-color)/20 transition focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-(--primary-color)/20 transition focus:outline-none "
            />
          </div>

          {/* Textarea */}
          <textarea
            placeholder="Drop your enquiries here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
            className="w-full mt-4 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-(--primary-color)/20 transition resize-none"
          />
        </div>

        <button
          disabled={postingMessage}
          className="w-72 md:w-[810px] cursor-pointer bg-(--primary-color) text-white font-medium py-3 rounded-lg cursor-pointer transition"
        >
          {postingMessage ? "Please wait..." : "Contact Us"}
        </button>
      </form>

      <div className="w-full mx-auto  mt-10 overflow-hidden">
        <iframe
          src="https://www.google.com/maps?q=21+Oyegbami+Street,+Iyana+Barrack,+Felele,+Ibadan&output=embed"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
