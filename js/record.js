let mediaRecorder;
let recordedChunks = [];
let recording = false; // boolean state recording or not

// random number
let randomNumber = Math.floor(Math.random() * 100);

// counter, local storage
let counter = localStorage.getItem('counter');
if (counter === null) {
    counter = 0;
    localStorage.setItem('counter', counter);
}

const liveFeed = document.getElementById('liveFeed');
const startRecordingButton = document.getElementById('startRecording');
const previewVideo = document.getElementById('preview');
const timerDisplay = document.getElementById('timer');

const question = document.getElementById('question');

const submit = document.getElementById('submit');

// id parameter
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const set_number = urlParams.get('set_number');

// global recording variables for blob recorded
let global_blob;

console.log(id);
console.log(counter);
console.log(set_number);

// ----------------------------------------------------------------------------------

// Questions
const set1 = [
  'Introduce yourself.',
  'What are your greatest strengths and weaknesses?',
  'How do you handle changes or unexpected situations in the workplace?',
  'What is your biggest achievement so far?',
  'Tell me about a time when you went above and beyond the call of duty to achieve a goal or deliver results.',
  'Give me an example of your creativity.'
]

const set2 = [
  'Introduce yourself.',
  'How do you work under pressure? Can you handle the pressure?',
  'If you won a Rs.10-crore lottery, would you still work?',
  'What motivates you?',
  'Can you give an example of a time when you successfully implemented a solution to improve a process or procedure?',
  'Tell me about a time when you had to step into a role outside of your expertise to support the team\'s objectives.'
]

const set3 = [
  'Introduce yourself.',
  'How do you respond to change?',
  'What was the toughest decision you ever had to make?',
  'What is your greatest fear?',
  'Describe a project where you took the lead in implementing a new strategy or process, driving positive change within your team or organization.',
  'Describe a situation where you identified a problem before it became significant. What steps did you take to address it?'
]

const set4 = [
  'Introduce yourself.',
  'How would you rate yourself on a scale of 1 to 10?',
  'How do you handle stress and anxiety?',
  'Tell me about a time when you were not satisfied with your performance?',
  'Can you give an example of a time when you successfully managed multiple competing priorities?',
  'Where do you see yourself in the next 5 years?'
]

const set5 = [
  'Introduce yourself.',
  'Why should a company hire you?',
  'Are you reliable? or Can I trust you with responsibilities?',
  'What makes you angry?',
  'Can you give an example of a time when you had to persuade others to adopt your ideas or proposals?',
  'Can you give an example of a time when you had to take the initiative to solve a problem without being asked?'
]

const set6 = [
  'Introduce yourself.',
  'Are you open to take risks? or Do you like experimenting?',
  'What is your dream company like?',
  'Do you have a good work ethic?',
  'Tell me about a time when you recognized and capitalized on the unique strengths of individual team members to achieve a common goal.',
  'Tell me about a time when you successfully resolved a long-standing issue that had been impeding progress within your team or organization.'
]

const set7 = [
  'Introduce yourself.',
  'How do you improve your knowledge?',
  'What are your hobbies?',
  'Can you give an example of a time when you led by example to promote a positive work culture or values?',
  'Describe a project where you encouraged open communication and feedback among team members, leading to improved collaboration and outcomes.',
  'Is there anything that makes you different from other candidates?'
]

const set8 = [
  'Introduce yourself.',
  'Can you describe your time management skills?',
  'Can you describe a situation where you had to overcome a significant challenge in a team setting?',
  'What do you do to ensure that your task is completed effectively?',
  'Can you give an example of a time when you demonstrated leadership skills?',
  'What are the three things that are most important for you in a job?'
]

const set9 = [
  'Introduce yourself.',
  'Are you open to take risks? or Do you like experimenting?',
  'How did you handle disagreements?',
  'Tell me about a time where you experienced difficulty while working on a project, how did you handle it?',
  'What makes you happy?',
  'Can you give an example of a situation where you mentored a junior colleague, helping them grow professionally and personally?'
]

const set10 = [
  'Introduce yourself.',
  'What are you passionate about?',
  'What motivates you to perform at your best in the workplace?',
  'Describe a time when you proactively sought out opportunities to develop new skills or knowledge relevant to your role.',
  'Can you give an example of a situation where you leveraged technology or automation to streamline a process and increase efficiency?',
  'Share a story of a project where you collaborated with a cross-functional team to deliver exceptional results.'
]

const set11 = [
  'Introduce yourself.',
  'Describe a situation where you had to adapt to a change in the work environment.',
  'What are you most proud of?',
  'What do you think is an ideal work environment?',
  'Tell me about a project you initiated or led that had a positive impact on your team or organization.',
  'Can you give an example of a time when you had to resolve a disagreement or misunderstanding within a team?'
]

const set12 = [
  'Introduce yourself.',
  'How do you deal with criticism?',
  'Tell me about a time when you failed to meet a goal or objective. How did you handle it?',
  'What has been your greatest failure?',
  'Tell me about a time when you had to resolve a conflict with a coworker or team member.',
  'Share a story of a project where you led the team in developing and implementing a solution that resulted in significant cost savings or revenue growth.'
]

const set13 = [
  'Introduce yourself.',
  'Tell me about a time when you had to work on a project outside of your comfort zone. How did you handle it?',
  'Are you an organized person?',
  'What do you always regret? Or Do you have any regrets?',
  'Share a story of how you took ownership of a project that was struggling and turned it into a success through your initiative.',
  'Can you give an example of a situation where you successfully motivated a disengaged team member to contribute effectively to a project?'
]

const set14 = [
  'Introduce yourself.',
  'How do you learn new skills?',
  'Describe a situation where you had to prioritize tasks under tight deadlines.',
  'How quickly do you adapt to new technology?',
  'Can you give an example of a time when you facilitated a productive team meeting or discussion?',
  'Describe a project where you collaborated with stakeholders to define the problem and develop a solution that met everyone\'s needs.'
]

const set15 = [
  'Introduce yourself.',
  'What is your dream job like?',
  'What are your weaknesses?',
  'Tell me about a time when you proposed an innovative idea that significantly improved team efficiency or productivity.',
  'Can you give an example of a time when you coached or mentored a colleague to help them achieve their goals?',
  'Share a story of a time when you rallied your team during a crisis, fostering resilience and determination.'
]


const questions = [set1, set2, set3, set4, set5, set6, set7, set8, set9, set10, set11, set12, set13, set14, set15];

// update question
question.textContent = questions[set_number][counter];

console.log(questions[set_number][counter]);

// ----------------------------------------------------------------------------------

let timerInterval;
let secondsElapsed = 0;

let stopRecordingTimeout; // variable to hold the timeout

var StartTime;

// Function to start capturing video and audio
function startRecording() {
  // Clear previous timer
  clearInterval(timerInterval);
  secondsElapsed = 0;
  updateTimerDisplay();

  //previewVideo.src = '#';
  // Clear previous recording chunks
  recordedChunks = [];

  timerInterval = setInterval(() => {
    secondsElapsed++;
    updateTimerDisplay();
  }, 1000);

  // Get video stream for live feed (without audio)
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(videoStream => {
      liveFeed.srcObject = videoStream;

      // Get combined stream for recording (audio and video)
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(recordingStream => {

            // state recording
            recording = true;

            // color change to red
            startRecordingButton.style.backgroundColor = 'red';

          mediaRecorder = new MediaRecorder(recordingStream);

          mediaRecorder.onstop = function() {
            var duration = new Date().getTime() - StartTime;
            console.log(duration);

            // clear the previous recording preview
            const blob = new Blob(recordedChunks, { type: 'video/webm' });

            ysFixWebmDuration(blob, duration, {logger: false})
            .then(function(fixedBlob) {
                global_blob = fixedBlob;
                previewVideo.src = URL.createObjectURL(fixedBlob);
            });

            //global_blob = blob;

            //previewVideo.src = URL.createObjectURL(blob);
            clearInterval(timerInterval);
            updateTimerDisplay();

            // Release recording stream resources after stopping
            recordingStream.getTracks().forEach(track => track.stop());

          };

          // new loc
          mediaRecorder.ondataavailable = function(event) {
            if (event.data.size > 0) {
              recordedChunks.push(event.data);
            }
          };

          mediaRecorder.start();
          
          // start recording time
          StartTime = new Date().getTime();

          console.log('Recording started');

          startRecordingButton.textContent = 'Stop Recording';
          startRecordingButton.removeEventListener('click', startRecording);

          // Clear any existing timeout
          clearTimeout(stopRecordingTimeout);

          // time limit for recording is 2 minutes
            setTimeout(() => {
                stopRecording();
            }, 120000);

          startRecordingButton.addEventListener('click', stopRecording);
        })
        .catch(error => {
          console.error('Error accessing recording stream:', error);
        });
    })
    .catch(error => {
      console.error('Error accessing video stream:', error);
    });
}

// Function to stop recording
function stopRecording() {
  // Clear the timeout to prevent automatic stopping
  clearTimeout(stopRecordingTimeout);
    
  mediaRecorder.stop();
  startRecordingButton.textContent = 'Start Recording';
  startRecordingButton.removeEventListener('click', stopRecording);
  startRecordingButton.addEventListener('click', startRecording);

  // color change back to blue
  startRecordingButton.style.backgroundColor = '#007bff';

  // state recording
  recording = false;

  console.log('Recording stopped');
}

// Function to update timer display
function updateTimerDisplay() {
  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to submit recording
// Function to submit recording
function submitRecording() {
  // Disable submit button and change its text to "Wait"
  submit.disabled = true;
  submit.textContent = 'Uploading...';

  //color change of submit button to green
  submit.style.backgroundColor = 'green';

  //block the start recording button
  startRecordingButton.disabled = true;

  console.log('Submitting recording...');

  // state recording not allowed to submit
  if (recording) {
      alert('Please stop recording before submitting');
      // Re-enable submit button and restore its text
      submit.disabled = false;
      submit.textContent = 'Submit';

      // color change of submit button to blue
      submit.style.backgroundColor = '#007bff';

      // Re-enable start recording button
      startRecordingButton.disabled = false;

      return;
  }

  // video available for submission, not empty
  if (recordedChunks.length === 0) {
      alert('Record your answer before submitting');
      // Re-enable submit button and restore its text
      submit.disabled = false;
      submit.textContent = 'Submit';

      // color change of submit button to blue
      submit.style.backgroundColor = '#007bff';

      // Re-enable start recording button
      startRecordingButton.disabled = false;
      return;
  }

  // Combine all recorded chunks into a single blob
  //const blob = new Blob(recordedChunks, { type: 'video/mp4' });
  const blob = global_blob;

  // convert blob to file
  const file = new File([blob], 'recording.webm', { type: 'video/webm' });

  // Create a FormData object to send the video blob
  const formData = new FormData();

  // random number new
  let rand = Math.floor(Math.random() * 100);

  file_name = set_number + "_" + counter + "_" + rand + randomNumber + ".webm";

  console.log(file_name);

  // API format video, folder_name, file_name
  formData.append('file', file);
  formData.append('folder_id', id);
  formData.append('file_name', file_name);

  // API endpoint
  const url = 'https://interview-hirevue-ae9c2f5fd450.herokuapp.com/upload';

  // Send the video blob to the server
  fetch(url, {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);

      if (data.message == "success") {
          alert('Recording submitted successfully');
          
          // increment the counter
          counter++;
          console.log(counter);
          localStorage.setItem('counter', counter);

          // if counter is 6, redirect to the next page
          if (counter === 6) {
              localStorage.removeItem('counter');
              localStorage.removeItem('set_number');
              // go to thank you page
              window.location.href = 'thankyou.html';
          }

          // update the question
          updateQuestion();

          // clear the preview video
          previewVideo.src = '#';
          recordedChunks = [];

          // clear the timer
          clearInterval(timerInterval);
          secondsElapsed = 0;

          // update timer display
          updateTimerDisplay();
      }

      else {
          alert('Error submitting recording, please try again! Reason: ' + data.message);
      }
  })
  // Error handling
  .catch(error => {
      console.error('Error:', error);
      alert('Error submitting recording');
  })
  .finally(() => {
      // Re-enable submit button and restore its text
      submit.disabled = false;
      submit.textContent = 'Submit';

      // color change of submit button to blue
      submit.style.backgroundColor = '#007bff';

      // Re-enable start recording button
      startRecordingButton.disabled = false;
  });
}

// function to update question
function updateQuestion() {
    // update question in the html
    question.textContent = questions[set_number][counter];
}

// Get live camera feed (without audio initially)
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    liveFeed.srcObject = stream;
  })
  .catch(error => {
    console.error('Error accessing camera:', error);
  });

startRecordingButton.addEventListener('click', startRecording);
submit.addEventListener('click', submitRecording);
