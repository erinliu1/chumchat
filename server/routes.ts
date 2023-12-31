import { ObjectId } from "mongodb";

import { Router, getExpressRouter } from "./framework/router";

import { Entry, Friend, Message, Profile, Prompt, User, Visibility, WebSession } from "./app";
import { UserDoc } from "./concepts/user";
import { WebSessionDoc } from "./concepts/websession";
import Responses from "./responses";

class Routes {
  @Router.get("/session")
  async getSessionUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.getUserById(user);
  }

  @Router.get("/users")
  async getUsers() {
    return await User.getUsers();
  }

  @Router.get("/users/:username")
  async getUser(username: string) {
    return await User.getUserByUsername(username);
  }

  @Router.post("/users")
  async createUser(session: WebSessionDoc, username: string, password: string) {
    WebSession.isLoggedOut(session);
    return await User.create(username, password);
  }

  @Router.patch("/users")
  async updateUser(session: WebSessionDoc, update: Partial<UserDoc>) {
    const user = WebSession.getUser(session);
    return await User.update(user, update);
  }

  @Router.delete("/users")
  async deleteUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    WebSession.end(session);
    return await User.delete(user);
  }

  @Router.post("/login")
  async logIn(session: WebSessionDoc, username: string, password: string) {
    const u = await User.authenticate(username, password);
    WebSession.start(session, u._id);
    return { msg: "Logged in!" };
  }

  @Router.post("/logout")
  async logOut(session: WebSessionDoc) {
    WebSession.end(session);
    return { msg: "Logged out!" };
  }

  // @Router.get("/posts")
  // async getPosts(author?: string) {
  //   let posts;
  //   if (author) {
  //     const id = (await User.getUserByUsername(author))._id;
  //     posts = await Post.getByAuthor(id);
  //   } else {
  //     posts = await Post.getPosts({});
  //   }
  //   return Responses.posts(posts);
  // }

  // @Router.post("/posts")
  // async createPost(session: WebSessionDoc, content: string, options?: PostOptions) {
  //   const user = WebSession.getUser(session);
  //   const created = await Post.create(user, content, options);
  //   return { msg: created.msg, post: await Responses.post(created.post) };
  // }

  // @Router.patch("/posts/:_id")
  // async updatePost(session: WebSessionDoc, _id: ObjectId, update: Partial<PostDoc>) {
  //   const user = WebSession.getUser(session);
  //   await Post.isAuthor(user, _id);
  //   return await Post.update(_id, update);
  // }

  // @Router.delete("/posts/:_id")
  // async deletePost(session: WebSessionDoc, _id: ObjectId) {
  //   const user = WebSession.getUser(session);
  //   await Post.isAuthor(user, _id);
  //   return Post.delete(_id);
  // }

  @Router.get("/friends")
  async getFriends(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.idsToUsernames(await Friend.getFriends(user));
  }

  @Router.delete("/friends/:friend")
  async removeFriend(session: WebSessionDoc, friend: string) {
    const user = WebSession.getUser(session);
    const friendId = (await User.getUserByUsername(friend))._id;
    const friendVisibleContent = await Visibility.getVisibleContent(friendId);
    const userVisibleContent = await Visibility.getVisibleContent(user);
    const result = await Friend.removeFriend(user, friendId);
    for (const contentId of friendVisibleContent) {
      const entry = await Entry.getById(contentId);
      if (entry.author.toString() === user.toString()) {
        await Visibility.makeInvisible(friendId, contentId);
      }
    }
    for (const contentId of userVisibleContent) {
      const entry = await Entry.getById(contentId);
      if (entry.author.toString() === friendId.toString()) {
        await Visibility.makeInvisible(user, contentId);
      }
    }
    return result;
  }

  @Router.get("/friend/requests/sent")
  async getPendingSentRequests(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Responses.friendRequests(await Friend.getPendingSentRequests(user));
  }

  @Router.get("/friend/requests/received")
  async getPendingReceivedRequests(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Responses.friendRequests(await Friend.getPendingReceivedRequests(user));
  }

  @Router.post("/friend/requests")
  async sendFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.sendRequest(user, toId);
  }

  @Router.delete("/friend/requests/:to")
  async removeFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.removeRequest(user, toId);
  }

  @Router.put("/friend/accept/:from")
  async acceptFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.acceptRequest(fromId, user);
  }

  @Router.put("/friend/reject/:from")
  async rejectFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.rejectRequest(fromId, user);
  }

  // API FOR PROMPT
  @Router.get("/prompts/random")
  async getRandomPrompt(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return { msg: "Successfully retrieved a prompt for session user.", prompt: await Prompt.getRandomPrompt(user) };
  }

  @Router.get("/prompts")
  async getCurrentPrompt(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return { msg: "Retrieved the current prompt for session user.", prompt: await Prompt.getCurrentPrompt(user) };
  }

  // API FOR ENTRY
  @Router.get("/entries")
  async getEntries(author?: string, id?: ObjectId) {
    if (author && id) {
      // check that the entry with the id is written by the author
      const authorId = (await User.getUserByUsername(author))._id;
      await Entry.isAuthor(authorId, id);
      return Responses.entry(await Entry.getById(id));
    } else if (author) {
      // return the list of entries written by the author
      const authorId = (await User.getUserByUsername(author))._id;
      return Responses.entries(await Entry.getByAuthor(authorId));
    } else if (id) {
      // return the entry with the given id
      return Responses.entry(await Entry.getById(id));
    } else {
      // return all the entries
      return Responses.entries(await Entry.getEntries({}));
    }
  }

  @Router.post("/entries")
  async addEntry(session: WebSessionDoc, prompt: string, response: string) {
    const user = WebSession.getUser(session);
    const created = await Entry.addEntry(user, prompt, response);
    return { msg: created.msg, entry: await Responses.entry(created.entry) };
  }

  @Router.patch("/entries/:_id")
  async editEntry(session: WebSessionDoc, _id: ObjectId, response: string) {
    const user = WebSession.getUser(session);
    await Entry.isAuthor(user, _id);
    const created = await Entry.editEntry(_id, response);
    return { msg: created.msg, entry: await Responses.entry(created.entry) };
  }

  @Router.delete("/entries/:_id")
  async removeEntry(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Entry.isAuthor(user, _id);
    return Entry.removeEntry(_id);
  }

  // API FOR MESSAGE CONCEPT
  @Router.post("/messages")
  async sendMessage(session: WebSessionDoc, recipientUsername: string, content: ObjectId) {
    const sender = WebSession.getUser(session);
    const recipient = (await User.getUserByUsername(recipientUsername))._id;
    await Entry.isAuthor(sender, content);
    const created = await Message.sendMessage(sender, recipient, content);
    return { msg: created.msg, message: await Responses.message(created.message) };
  }

  @Router.get("/messages/sent")
  async getSentMessages(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    const username = (await User.getUserById(user)).username;
    return { msg: `All messages sent by ${username}`, messages: await Responses.messages(await Message.getSentMessages(user)) };
  }

  @Router.get("/messages/received")
  async getReceivedMessages(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    const username = (await User.getUserById(user)).username;
    return { msg: `All messages received by ${username}`, messages: await Responses.messages(await Message.getReceivedMessages(user)) };
  }

  // API FOR PROFILE CONCEPT
  @Router.post("/profiles")
  async createProfile(session: WebSessionDoc, name: string, bio: string, profileImg: string) {
    const user = WebSession.getUser(session);
    const username = (await User.getUserById(user)).username;
    return { msg: `Profile created successfully for ${username}`, profile: await Responses.profile(await Profile.createProfile(user, name, bio, profileImg)) };
  }

  @Router.patch("/profiles")
  async editProfile(session: WebSessionDoc, name?: string, bio?: string, profileImg?: string) {
    const user = WebSession.getUser(session);
    if (name) {
      await Profile.editName(user, name);
    }
    if (bio) {
      await Profile.editBio(user, bio);
    }
    if (profileImg) {
      await Profile.editProfileImg(user, profileImg);
    }
    return { msg: "Profile successfully edited!", profile: await Responses.profile(await Profile.getProfile(user)) };
  }

  @Router.get("/profiles")
  async getProfile(username?: string) {
    if (username) {
      const userId = (await User.getUserByUsername(username))._id;
      return await Responses.profile(await Profile.getProfile(userId));
    }
    return await Responses.profiles(await Profile.getAllProfiles());
  }

  @Router.get("/profiles/randomImg")
  async getRandomProfileImg() {
    return await Profile.getRandomProfileImg();
  }

  // API FOR VISIBILITY CONCEPT
  @Router.get("/visibility")
  async getVisibleContent(session: WebSessionDoc, username?: string) {
    const user = WebSession.getUser(session);
    const contents = await Visibility.getVisibleContent(user);
    const entries = [];
    for (const contentId of contents) {
      const entry = await Entry.getById(contentId);
      if (username) {
        const authorId = (await User.getUserByUsername(username))._id;
        if (entry.author.toString() === authorId.toString()) {
          entries.push(entry);
        }
      } else {
        entries.push(entry);
      }
    }
    return await Responses.entries(entries);
  }

  @Router.get("/visibility/content")
  async getVisibleUsers(content: ObjectId) {
    const users = await Visibility.getVisibleUsers(content);
    const usernames = [];
    for (const user of users) {
      usernames.push((await User.getUserById(user)).username);
    }
    return usernames;
  }

  @Router.post("/visibility")
  async makeContentPublic(session: WebSessionDoc, contentId: ObjectId) {
    const user = WebSession.getUser(session);
    const friends = await Friend.getFriends(user);
    try {
      await Promise.all(friends.map((friendId) => Visibility.makeVisible(friendId, contentId)));
      const users = await Visibility.getVisibleUsers(contentId);
      const usernames = [];
      for (const user of users) {
        usernames.push((await User.getUserById(user)).username);
      }
      return { msg: "Content made visible to all friends", users: usernames };
    } catch (e) {
      console.log("error in making entry visible to all friends");
    }
  }
}

export default getExpressRouter(new Routes());
