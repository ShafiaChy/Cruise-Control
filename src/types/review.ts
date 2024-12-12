export type TReview = {
    _id: string;
    userId:string;
    name: string;
    designation:string;
    picture: string;//
    review: string;
    rating: number; // Typically from 1 to 5
   // Optional field for verifying the review
  };
  