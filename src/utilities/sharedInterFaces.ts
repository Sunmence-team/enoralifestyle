export interface blogProps {
  title: string;
  short_description: string;
  body: string;
  cover_image: string | File;
}

export interface testimonialProps {
  id: number;
  full_name: string;
  occupation: string;
  comment: string;
  image: string | File;
}
