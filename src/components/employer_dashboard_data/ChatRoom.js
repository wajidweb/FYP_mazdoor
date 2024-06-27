import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../services/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import UserSearch from "./UserSearch";
import { IoSend } from "react-icons/io5";

const ChatRoom = ({ user, mazdoor }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesEndRef = useRef(null);
  const users = useSelector((state) => state.users.users);
 

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    });
    return unsubscribe;
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const currentUser = user;
    console.log("currentUser", currentUser);

    if (!currentUser) {
      console.error("User is not authenticated");
      return;
    }

    if (newMessage.trim() === "" || !selectedUser) {
      console.error("Message is empty or no user selected");
      return;
    }

    const { uid, name, userType, userId } = currentUser;
    const {
      id: recipientId,
      name: recipientName,
      userType: recipientUserType,
    } = selectedUser;

    // Ensure all fields have valid values
    if (!recipientId || !recipientName || !recipientUserType) {
      console.error("Selected user has invalid fields");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: new Date(),
        uid,
        name,
        userId,
        userType,
        recipientId,
        recipientName,
        recipientUserType,
      });
      setNewMessage("");
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.uid === auth.currentUser?.uid &&
        msg.recipientId === selectedUser?.id) ||
      (msg.uid === selectedUser?.id &&
        msg.recipientId === auth.currentUser?.uid)
  );

  
  return (
    <div className="w-full bg-white">
      <section className="w-full">
        <div className="w-full flex flex-col justify-center items-center sm:flex-row sm:justify-start sm:items-start">
          <div className="md:w-1/4 w-full bg-gray-300 h-screen flex flex-col justify-start items-center">
            <p className="text-lg text-center py-3 font-bold">MESSAGES</p>

            <UserSearch onUserSelect={setSelectedUser} />
          </div>

          {selectedUser && (
            <div className="w-full sm:w-3/4">
              <div className="w-full flex flex-col justify-start items-start">
                <div className="w-full bg-slate-200 py-4 px-4 flex flex-row justify-start items-center ">
                  <div className="w-8 h-8 rounded-full mx-3">
                    <img
                      src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504"
                      className="w-full h-full rounded-full"
                      alt="user image"
                    />
                  </div>
                  <p className="font-bold">{selectedUser?.name}</p>
                </div>

                <div className="w-full flex flex-col justify-start items-start">
                  <div className="w-full bg-slate-50 h-96 overflow-auto">
                    {/* <div className="flex items-start gap-2.5 py-3 px-3">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504"
                        alt="user image"
                      />
                      <div className="flex flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-semibold text-gray-900 dark:text-black">
                            Bonnie Green
                          </span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            11:46
                          </span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                          <p className="text-sm font-normal text-gray-900 dark:text-white">
                            That's awesome. I think our users will really
                            appreciate the improvements.
                          </p>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="flex items-start gap-2.5 py-3 px-3">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504"
                        alt="user image"
                      />
                      <div className="flex flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-semibold text-gray-900 dark:text-black">
                            Bonnie Green
                          </span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            11:46
                          </span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                          <p className="text-sm font-normal text-gray-900 dark:text-white">
                            That's awesome. I think our users will really
                            appreciate the improvements.
                          </p>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="flex items-start gap-2.5 py-3 px-3">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504"
                        alt="user image"
                      />
                      <div className="flex flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-semibold text-gray-900 dark:text-black">
                            Bonnie Green
                          </span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            11:46
                          </span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                          <p className="text-sm font-normal text-gray-900 dark:text-white">
                            That's awesome. I think our users will really
                            appreciate the improvements.
                          </p>
                        </div>
                      </div>
                    </div> */}

                    <div className="flex flex-col justify-end items-end gap-2.5 py-3 px-3" >
                      {filteredMessages.map((msg, index) => (
                        <div key={index}>
                          <img
                            className="w-8 h-8 rounded-full"
                            src={mazdoor?.imageUrl}
                            alt="user image"
                          />
                          <div className="flex flex-col gap-1 w-full max-w-[320px]">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <span className="text-sm font-semibold text-gray-900 dark:text-black">
                                {msg.name}
                              </span>
                              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                11:46
                              </span>
                            </div>
                            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-900">
                              <p className="text-sm font-normal text-gray-900 dark:text-white">
                               {msg.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef}></div>
                    </div>
                  </div>

                  <div className="w-full py-5 bg-slate-200 px-3 flex flex-row justify-between items-center">
                    <form
                      className="w-full flex flex-row"
                      onSubmit={handleSendMessage}
                    >
                      <input
                        type="text"
                        id="message"
                        className="block w-full py-3 px-2 ps-10 text-sm text-gray-900 border border-gray-600 rounded-lg bg-gray-50 focus:ring-blue-500  focus:border-blue-500 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter message here ..."
                        required=""
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <div className="py-1 px-4">
                        <button type="submit" className="text-lg py-1 px-4">
                          <IoSend className="text-2xl" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ChatRoom;
