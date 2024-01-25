const ROUTES = {
  root: () => "/",
  notesRoute: () => "/notes",
  noteRoute: (id) => `/notes/${id}`,
  conversationsRoute: () => "/conversations",
  newConversationRoute: () => "/conversations/new",
  conversationRoute: (id) => `/conversations/${id}`,
};
  
 export default ROUTES;
