// src/components/ChatLLM.jsx
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
const apiDir = import.meta.env.FAST_API_FRANCK;


const ChatLLM = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            content: '¡Hola! Soy el asistente de Francisco Romero. Puedo responder preguntas sobre mi experiencia en desarrollo web, IoT, proyectos, tecnologías que manejo y más. ¿En qué puedo ayudarte?',
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Scroll automático al último mensaje
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus en el input al cargar
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Función para agregar mensaje
    const addMessage = (content, isUser = false) => {
        const newMessage = {
            id: Date.now(),
            content,
            isUser,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
    };

    // Función para enviar mensaje
    const handleSendMessage = async () => {
        const message = inputValue.trim();
        if (!message || isLoading) return;

        // Agregar mensaje del usuario
        addMessage(message, true);
        setInputValue('');
        setIsLoading(true);
        setIsTyping(true);

        try {
            // Aquí irá tu llamada a la API con axios
            console.log(apiDir);
            const response = await axios.post('http://localhost:8000/api/v1/llm/chat', {
                "prompt": message,
                "model": "gpt-5-nano"
            });
            // console.log(response);
            const data = await response.data;
            // console.log(data);
            // Por ahora simulamos una respuesta
            // await new Promise(resolve => setTimeout(resolve, 2000));

            // Simular respuesta del asistente
            const aiResponse = data.response;
            addMessage(aiResponse, false);

        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            addMessage('Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.', false);
        } finally {
            setIsLoading(false);
            setIsTyping(false);
        }
    };

    // Función para manejar Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Función para limpiar chat
    const clearChat = () => {
        setMessages([{
            id: Date.now(),
            content: '¡Hola! Soy el asistente de Francisco Romero. Puedo responder preguntas sobre mi experiencia en desarrollo web, IoT, proyectos, tecnologías que manejo y más. ¿En qué puedo ayudarte?',
            isUser: false,
            timestamp: new Date()
        }]);
    };

    return (
        <div className="max-w-4xl w-full">
            {/* Título principal */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-blue-400 mb-4">
                    ¿Qué quieres saber de mí?
                </h1>
                <p className="text-2xl text-gray-300">
                    Pregunta a mi asistente
                </p>
            </div>

            {/* Chat container */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 mb-8 min-h-96">
                {/* Header del chat */}
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-white">Asistente IA</h3>
                    <button
                        onClick={clearChat}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                        title="Limpiar chat"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>

                {/* Mensajes */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                    {messages.map((message) => (
                        <div key={message.id} className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.isUser ? 'bg-green-500' : 'bg-blue-500'
                                }`}>
                                <span className="text-white text-sm font-bold">
                                    {message.isUser ? 'Tú' : 'AI'}
                                </span>
                            </div>
                            <div className={`rounded-lg p-3 max-w-3xl ${message.isUser
                                    ? 'bg-green-600/20 border border-green-500/30'
                                    : 'bg-gray-800/70'
                                }`}>
                                <p className={message.isUser ? 'text-green-200' : 'text-gray-200'}>
                                    {message.content}
                                </p>
                                <span className="text-xs text-gray-500 mt-2 block">
                                    {message.timestamp.toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Indicador de escritura */}
                    {isTyping && (
                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-sm font-bold">AI</span>
                            </div>
                            <div className="bg-gray-800/70 rounded-lg p-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input y botón de envío */}
                <div className="flex space-x-3">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Escribe tu pregunta aquí..."
                        disabled={isLoading}
                        className="flex-1 bg-gray-800/70 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Indicador de estado */}
            {isLoading && (
                <div className="text-center text-gray-400">
                    <span>Procesando tu pregunta...</span>
                </div>
            )}
        </div>
    );
};

export default ChatLLM;
