NEURAL NINJAS

Topic - AI Bases tool to assist visitors at police station

Our project provides an online platform that enhances communication between visitors and police services through tools like CopBot and CopHelp. It enables users to access essential legal information, file various crime cases, and track their Police Clearance Certificate applications in real time. By offering features such as online translation and a centralized service button, we streamline the reporting process and reduce the need for in-person visits. This project empowers citizens with critical information during emergencies while improving efficiency for police officers. Ultimately, it creates a more responsive and accessible law enforcement system.

How to run locally
1. MERN component
    There are 2 folders namely server and client
    make sure to install node.js locally
    run npm install in both server and client folder to install dependencies
    to run the server go the server folder and execute -
    npm run start
    to run the react frontend go to client folder and execute -
    npm run dev
2. API hosting NLP based python component
    there are 2 folders namely policeass and faq
    in each folder there is a python script, data set and requirements.txt
    in policeass there will be a pre trained model no need to disturb it
    since we are hosting an api for mern component to fetch , both the python files are flask applications
    run both the apps in their  respective folders using -
    python app.py
    python qaf.py
    since these are api's host them or port forward  them to access them from mern component
    after that we moove back to MERN COMPONENT
3. in client->src->report.jsx there is a fetch request , just copy and paste the    link of main.py's server there
    in client->src->cophelp.jsx , paste the  link of qaf.py's server in fetch request there

4. configure your own mongo db and use the given schema's

you are all done


 
