import { ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";

export interface VisibilityDoc extends BaseDoc {
  user: ObjectId;
  content: ObjectId;
}

export default class VisibilityConcept {
  public readonly visibilityMap = new DocCollection<VisibilityDoc>("visibilityMap");

  async getVisibleUsers(contentId: ObjectId) {
    const visibilityData = await this.visibilityMap.readMany({ content: contentId });
    return visibilityData.map((pair) => pair.user);
  }

  async getVisibleContent(userId: ObjectId) {
    const visibilityData = await this.visibilityMap.readMany({ user: userId });
    return visibilityData.map((pair) => pair.content);
  }

  async makeVisible(userId: ObjectId, contentId: ObjectId) {
    const existingVisibility = await this.visibilityMap.readOne({ user: userId, content: contentId });
    if (!existingVisibility) {
      await this.visibilityMap.createOne({ user: userId, content: contentId });
      return { msg: "Successfully made content visible!", visibleContent: await this.getVisibleContent(userId) };
    } else {
      return { msg: "Content is already visible.", visibleContent: await this.getVisibleContent(userId) };
    }
  }

  async makeInvisible(userId: ObjectId, contentId: ObjectId) {
    const existingVisibility = await this.visibilityMap.readOne({ user: userId, content: contentId });
    if (existingVisibility) {
      await this.visibilityMap.deleteOne({ user: userId, content: contentId });
      return { msg: "Successfully made content invisible!", visibleContent: await this.getVisibleContent(userId) };
    } else {
      return { msg: "Content is already invisible.", visibleContent: await this.getVisibleContent(userId) };
    }
  }
}
