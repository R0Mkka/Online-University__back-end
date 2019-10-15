const TABLE_NAME = 'chat';
const CHAT_USER = 'chat_user';

export enum ChatsQueriesList {
  GetUserChats = 'GetUserChats',
  GetChat = 'GetChat',
  GetChatMessages = 'GetChatMessages',
  GetChatUsers = 'GetChatUsers',
  CreateChat = 'CreateChat',
  CreateChatConnection = 'CreateChatConnection',
  AddMessage = 'AddMessage',
}

export const ChatsQueries: { [key in ChatsQueriesList]: string } = {
  // TODO: Think about image
  GetUserChats: `
    SELECT
      c.chatId, cu.userId creatorId, c.imageId, c.chatName, c.createdAt
    FROM
      ${CHAT_USER} cu
    LEFT JOIN
      ${TABLE_NAME} c
    USING(chatId)
    WHERE
      userId = ?;
  `,
  GetChat: `
    SELECT
      *
    FROM
      ${TABLE_NAME}
    WHERE
      chatId = ?;
  `,
  GetChatMessages: `
    SELECT
      m.messageId,
      m.messageText,
      m.userId,
      m.sentAt,
      CONCAT(u.firstName, ' ', u.lastName) authorName
    FROM
      message m
    LEFT JOIN users u
    USING (userId)
    WHERE
      chatId = ?;
  `,
  GetChatUsers: `
    SELECT
      u.userId,
      u.firstName,
      u.lastName,
      u.educationalInstitution,
      u.email,
      u.accountImageId,
      u.roleId,
      u.registeredAt,
      u.themeId,
      u.languageId,
      u.userName,
      eu.enteredAt,
      eu.statusId
    FROM
      ${CHAT_USER}
    LEFT JOIN users u
    USING (userId)
    LEFT JOIN entered_users eu
    ON eu.enteredUserId = u.userId
    WHERE
      chatId = ?;
  `,
  CreateChat: `
    INSERT INTO ${TABLE_NAME}(creatorId, chatName)
    VALUES (?,?);
  `,
  CreateChatConnection: `
    INSERT INTO ${CHAT_USER}(chatId, userId)
    VALUES(?,?);
  `,
  AddMessage: `
    INSERT INTO message(
      messageText,
      chatId,
      userId
    )
    VALUES(?,?,?);
  `,
};
