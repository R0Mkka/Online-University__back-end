const TABLE_NAME = 'chat';
const CHAT_USER = 'chat_user';

export enum ChatsQueriesList {
  GetUserChats = 'GetUserChats',
  GetChat = 'GetChat',
  GetChatMessages = 'GetChatMessages',
  CreateChat = 'CreateChat',
  CreateChatConnection = 'CreateChatConnection',
  AddMessage = 'AddMessage',
}

export const ChatsQueries: { [key in ChatsQueriesList]: string } = {
  // TODO: Think about image
  GetUserChats: `
    SELECT
      c.chatId, c.imageId, c.chatName, c.createdAt
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
      *
    FROM
      message
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
