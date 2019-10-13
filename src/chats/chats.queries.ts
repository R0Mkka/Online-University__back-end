const TABLE_NAME = 'chat';
const CHAT_USER = 'chat_user';

export enum ChatsQueriesList {
  GetUserChats = 'GetUserChats',
  CreateChat = 'CreateChat',
  CreateChatConnection = 'CreateChatConnection',
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
  CreateChat: `
    INSERT INTO ${TABLE_NAME}(creatorId, chatName)
    VALUES (?,?);
  `,
  CreateChatConnection: `
    INSERT INTO ${CHAT_USER}(chatId, userId)
    VALUES(?,?);
  `,
};
