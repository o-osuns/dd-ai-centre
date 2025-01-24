import axios from "axios";
import { useDispatch } from 'react-redux';
import { addMessage, setIsLoading } from '../states/messagesSlice';
import { toast } from "react-toastify";

const AgentService = () => {
  const dispatch = useDispatch();

  const getAgents = async (input) => {
    dispatch(setIsLoading(true));

    try {
      const response = await axios.post("http://localhost:5000/agent", {"input": input}, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      let aiResponse = "";
      response.data.forEach(data => {
        if (data?.agent?.messages) {
          data.agent.messages.forEach(message => {
            if (message.content) {
              aiResponse = message.content;
            }
          });
        }
      });

      dispatch(addMessage({ "role": "assistant", "content": aiResponse,}));
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error("Error fetching agents:", error);
      toast.error("Error fetching agents");
      dispatch(setIsLoading(false));
    }
  };

  return {
    getAgents,
  };


};

export default AgentService;