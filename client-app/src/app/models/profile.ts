import { User } from "./user";

export interface Profile {
    username: string;
    displayname: string;
    image?: string;
    bio?: string;
    photos?: Photo[]
    followersCount: number;
    followingCount: number;
    following: boolean;
  }

  export class Profile implements Profile {
    constructor(user: User) {
      this.username = user.username;
      this.displayname = user.displayname;
      this.image = user.image;
    }
  }

  export class ProfileFormValues {
    displayname: string = "";
    bio?: string = "";

    constructor(profile?: ProfileFormValues) {
      if(profile) {
        this.displayname = profile.displayname;
        this.bio = profile.bio;
      }
    }
  }

  export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
  }
  
  export interface UserActivity {
    id: string;
    title: string;
    category: string;
    date: Date;
  }
