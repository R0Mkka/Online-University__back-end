const TABLE_NAME = 'chat';
const CHAT_USER = 'chat_user';

export enum ChatsQueriesList {
  GetUserChats = 'GetUserChats',
}

export const ChatsQueries: { [key in ChatsQueriesList]: string } = {
  GetUserChats: `
    SELECT
      c.chatId, c.chatName, c.createdAt
    FROM
      ${CHAT_USER} cu
    LEFT JOIN
      ${TABLE_NAME} c
    USING(chatId)
    WHERE
      userId = ?;
  `,
};
