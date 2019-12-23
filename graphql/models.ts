export type Visitor = {
  firstName: string;
  lastname: string;
  email: string;
};

export type Expertise = {
  domain: string;
  title: string;
};

export type Speaker = {
  _id: string;
  age: string;
  avatar: string;
  expertise: Expertise;
  name: string;
  nationality: string;
};

export type Meetup = {
  _id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  speakers: Speaker[];
  visitors: Visitor[];
};
