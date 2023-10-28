import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface ProfileDoc extends BaseDoc {
  owner: ObjectId;
  name: string; // if the user doesn't specifiy a name, this field will be an empty string
  bio: string; // if the user doesn't specifiy a bio, this field will be an empty string
  profileImg: string; // if the user doesn't specify a bio, this field will be a default image file
}

export default class ProfileConcept {
  public readonly profiles = new DocCollection<ProfileDoc>("profiles");
  public readonly profileImgs = [
    "https://pbs.twimg.com/media/EjM7JCvU8AA9kWu.png",
    "https://i.pinimg.com/originals/a3/89/69/a389694daa51e5ddf5c808ff34032e23.jpg",
    "https://i.pinimg.com/1200x/e8/28/60/e8286019556b6efd38145197bfe39fbf.jpg",
    "https://i.pinimg.com/1200x/38/19/21/381921be3eacc13ae2d831502f76802e.jpg",
    "https://wallpapers-clan.com/wp-content/uploads/2022/11/cute-frog-pfp-16.jpg",
    "https://i.pinimg.com/564x/db/2f/7e/db2f7e785f420c40fd47980ce8e8312b.jpg",
    "https://wallpapers-clan.com/wp-content/uploads/2022/11/cute-frog-pfp-10.jpg",
    "https://i.pinimg.com/474x/c2/76/29/c2762911b15712316e88fc6af0eedb5c.jpg",
    "https://pbs.twimg.com/media/FRxYjGEXoAAuq_V.jpg",
    "https://i.quotev.com/tkik7ttolvqq.jpg",
    "https://pbs.twimg.com/profile_images/1604732880671760384/FY8vnX7s_400x400.jpg",
    "https://i.redd.it/1cchrasc7gx71.jpg",
    "https://image.spreadshirtmedia.com/image-server/v1/compositions/T1459A839PA3861PT28D1051140347W10000H9380/views/1,width=378,height=378,appearanceId=839,backgroundColor=FFFFFF,noPt=true/frog-eating-strawberry.jpg",
    "https://image.spreadshirtmedia.net/image-server/v1/products/T1459A840PA4459PT28D326817481W10000H10000/views/1,width=378,height=378,appearanceId=840,backgroundColor=F2F2F2/cute-frog-loves-drinking-bubble-tea.jpg",
    "https://ih1.redbubble.net/image.2374519618.3697/st,small,507x507-pad,600x600,f8f8f8.u2.jpg",
    "https://ih1.redbubble.net/image.4649702263.3840/st,small,507x507-pad,600x600,f8f8f8.jpg",
  ];
  async getProfile(userId: ObjectId) {
    const profile = await this.profiles.readOne({ owner: userId });
    if (profile === null) {
      throw new NotFoundError(`This user does not have a profile!`);
    }
    return profile;
  }

  async getAllProfiles() {
    return await this.profiles.readMany({});
  }

  async getRandomProfileImg() {
    const randomIndex = Math.floor(Math.random() * this.profileImgs.length);
    return this.profileImgs[randomIndex];
  }

  async createProfile(userId: ObjectId, name: string = "", bio: string = "", profileImg: string = "") {
    const existingProfile = await this.profiles.readOne({ owner: userId });
    if (existingProfile) {
      throw new NotAllowedError("User already has a profile.");
    }
    await this.profiles.createOne({ owner: userId, name: name, bio: bio, profileImg: profileImg });
    return await this.getProfile(userId);
  }

  async editName(userId: ObjectId, name: string) {
    this.sanitizeUpdate({ name });
    const profile = await this.getProfile(userId);
    await this.profiles.updateOne({ _id: profile._id }, { name });
    return { msg: "Profile name edited successfully!", profile: await this.getProfile(userId) };
  }

  async editBio(userId: ObjectId, bio: string) {
    this.sanitizeUpdate({ bio });
    const profile = await this.getProfile(userId);
    await this.profiles.updateOne({ _id: profile._id }, { bio });
    return { msg: "Profile bio edited successfully!", profile: await this.getProfile(userId) };
  }

  async editProfileImg(userId: ObjectId, profileImg: string) {
    this.sanitizeUpdate({ profileImg });
    const profile = await this.getProfile(userId);
    await this.profiles.updateOne({ _id: profile._id }, { profileImg });
    return { msg: "Profile image edited successfully!", profile: await this.getProfile(userId) };
  }

  private sanitizeUpdate(update: Partial<ProfileDoc>) {
    // Make sure the update cannot change the user.
    const allowedUpdates = ["name", "bio", "profileImg"];
    for (const key in update) {
      if (!allowedUpdates.includes(key)) {
        throw new NotAllowedError(`Cannot update '${key}' field!`);
      }
    }
  }
}
