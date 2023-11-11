document.addEventListener('DOMContentLoaded', () => {
    const localVideo = document.getElementById('local-video');
    const remoteVideo = document.getElementById('remote-video');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const randomMatchBtn = document.getElementById('random-match-btn');
    const cameraSettingsBtn = document.getElementById('camera-settings-btn');
    const aboutUsBtn = document.getElementById('about-us-btn');

    let localStream;
    let remoteStream;

    // Function to start video streaming
    const startVideo = async () => {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideo.srcObject = localStream;
            showChat();
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    // Function to stop video streaming
    const stopVideo = () => {
        const tracks = localStream.getTracks();
        tracks.forEach(track => track.stop());
        localVideo.srcObject = null;
        hideChat();
    };

    // Function to handle random matching
    const randomMatch = () => {
        // Implement logic to find a random match and initiate a video call
    };

    // Function to handle camera settings
    const changeCameraSettings = async (videoConstraints) => {
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true });
            localVideo.srcObject = newStream;
            localStream.getTracks().forEach(track => track.stop());
            localStream = newStream;
        } catch (error) {
            console.error('Error changing camera settings:', error);
        }
    };

    // Function to display a chat message
    const displayMessage = (sender, message) => {
        const li = document.createElement('li');
        li.textContent = `${sender}: ${message}`;
        if (sender === 'You') {
            li.classList.add('you');
        } else {
            li.classList.add('stranger');
        }
        chatMessages.appendChild(li);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
    };

    // Function to handle sending a chat message
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (message !== '') {
            // Display the message locally
            displayMessage('You', message);

            // Implement logic to send the message to the other user
            // This could involve using a WebSocket or other communication method
        }
        chatInput.value = ''; // Clear the input field
    };

    // Function to show the chat interface
    const showChat = () => {
        chatInput.style.display = 'inline';
        sendBtn.style.display = 'inline';
        chatMessages.innerHTML = ''; // Clear previous chat messages
    };

    // Function to hide the chat interface
    const hideChat = () => {
        chatInput.style.display = 'none';
        sendBtn.style.display = 'none';
    };

    // Event listeners
    startBtn.addEventListener('click', startVideo);
    stopBtn.addEventListener('click', stopVideo);
    randomMatchBtn.addEventListener('click', randomMatch);
    cameraSettingsBtn.addEventListener('click', () => {
        const videoConstraints = {
            width: { ideal: 720 },
            height: { ideal: 480 },
        };
        changeCameraSettings(videoConstraints);
    });
    sendBtn.addEventListener('click', sendMessage);
    aboutUsBtn.addEventListener('click', () => {
        document.getElementById('about-us-modal').style.display = 'block';
    });

    // Close modal event listeners
    const closeModalButtons = document.querySelectorAll('.close');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('privacy-policy-modal').style.display = 'none';
            document.getElementById('terms-conditions-modal').style.display = 'none';
            document.getElementById('about-us-modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});
