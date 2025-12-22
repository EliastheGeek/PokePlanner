# Project Submission

### Setup
To set up the project type: npm install in the working directory, then: npm run dev.
The project is also deployed at https://pokemonteamplanner.web.app/

### Third-party components
The webpage uses third party components in chatInterface.jsx (UI-components from shadcn.io). We also use MUI in chatInterface, damageCalcView, detailsView, landingView, loginView, menuBarView, suspenseView, searchView.

We use some “bigger” prebuilt components from MUI in for example the menubar, these we have modified to fit our use case. 


- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


# PokéPlanner-Project
Build, test, and refine your competitive Pokémon teams in one place. Our teambuilder lets you pick Pokémon, customize moves, items, EVs & IVs, natures, and Tera types, while instantly tracking stats, type matchups, weaknesses, and synergy. A built-in damage calculator shows realistic damage rolls and KO chances for your moves, and an AI assistant in the corner is always ready to point out team flaws and suggest improvements. Log in to save, review, and improve your teams and return to them anytime.
## What we have done
We have implemented a first version of Pokechat - a chat bot that uses the OpenAI API. Pokebot gives the user the possibility to receive feedback on its Pokémon team and also to ask general questions.

The communication with the OpenAI API goes via a private separate server hosted by render.com. Our main (frontend) project then sends user prompts and fetches responses from that server, using common fetch-routines learned from the course labs.

The purpose of the stand-alone backend server is to keep the API key unexposed (Render.com provides this feature) but also to keep the frontend and backend separated, which simplifies development but also enhances user experience. The backend layer was necessary to be able to use the OpenAI API.

We’ve also implemented a visual representation of the current pokemon team the user has as teamView. There’s also a searchView and a detailsView closely related to the team, as this allows the user to add more pokemon to the team and what moves they have respectively. For each of these three views, a presenter has been made that passes along the methods and information that is required from the pokeAPI calls. At the moment, it’s not possible to add pokemon or change what moves they have as the dropdown menus displaying the options doesn’t pass the users input yet. 

## Still plan to do
Regarding PokéBot we plan to refine the system prompts to get the responses as meaningful (and brief) as possible. We plan to work further on the UI and overall user experience. We also intend to look into the possibility of storing the chat sessions for the users. We plan to include a “Google sign-in” option.

There are also plans to further refine what is present, like adding more factors to the damage calculator and enabling the user to actually add Pokémon to their team, their moves and other information that should be persisted user-wise.

## Files
### chatInterface.jsx
Works as a view layer for the chat. Receives user input and passes it up to the presenter layer (ChatBot) using props. Also receives the responses from the presenter. All UI is nicely presented to the user using UI components from ShadCN with the addition of some components from MUI.
### chatPresenter.jsx
Presenter layer for the chat. Communicates with the store state using ACBs, dispatch-methods and thunks.
### chatThunks.js
Thunk used to make the prompts more manageable. Communicates with the store through dispatch-methods. Also passes/receives the query/response to the prompt method that communicates with the backend.
### chatSource.js
Fetches data (as JSON) from the backend server (OpenAI API).
### backendConfig.js
Contains the link to the backend-server
### pokemonSource.js
Fetches data from pokeAPI with two different methods, searchPokemon and showAllPokemon. searchPokemon takes the pokemon’s name as input and fetches information about that particular pokemon. showAllPokemon fetches all available pokemon in the game as a list of elements with the attributes: name and url, where the url provides more information about the pokemon.
### pokeConst.js
A representation of an API call for the pokemon pikachu, with some restrictions regarding some attributes that were not relevant to our project. Serves as a first pokemon within the team as an example of how to interact with a pokemon.
### reduxStore.js
Includes a chat-slice which contains initial state and reducers for the chat. The reducers and chat-attributes can handle to set user prompt-settings (setIncludeTeam), handle prompt errors/success and also store the chat messages. 

The poke-slice contains the initial state and reducers for the pokemon team and damage calculator. The reducers cover the team, searching for a pokemon, logging in, setting variables in the damage calculator, resolving promises and persisting in firebase.
### loginView.jsx
This view is where users can login, and/or register. It uses MUI components. It follows the instructions from the “Authentication and per-user persistence (firebase)” page on canvas. However some additions were included so that users can get feedback if they submit the wrong password/email. 
### loginPresenter.jsx
The loginPresenter is responsible for the connection between the reduxStore and the loginView. It uses selectors to provide the view with the relevant props from the state. If a user exists, we redirect them away from the login view accordingly. 
### menuBarView.jsx 
The menuBars purpose is to help the user navigate throughout the application. This is achieved with a dropdown menu, which redirects the users to different sections of the application. In the menuBar is where the user can choose to login or logout (if they are logged in), logging in redirects the user to the loginView, and logging out propagates to the menuBarPresenter, where it's taken care of. If a user is null in the state we render the login button else the logout.
### menuBarPresenter.jsx
This presenter is simple and gets the user attribute from the state, and propagates the logout to firestore.
### teamView.jsx
Displays the user’s current team using array-rendering, two ACB’s are used to allow the user to remove pokemon’s from the team using an “x” button and viewing details respectively. A copy of the team-array is used to display its contents to the user.
### teamPresenter.jsx
Passes along the team, the current pokemon selected and methods to remove pokemon from reduxStore to view.
### detailsView.jsx
Displays detailed information about the selected pokemon, such as its stats and type. Here, the user can choose its ability and moves, using dropdown menus that list all available options for the chosen pokemon. There also exists a button to return to the team view. 
### detailsPresenter.jsx
The team-array from reduxStore is filtered by comparing the names of the pokemon in the team with the attribute currentPokemonName, resulting in an array that only contains the selected pokemon. This pokemon is then passed to view.
### searchView.jsx
Is a dropdown searchbar that shows all available pokemon to the user, where the user can type to narrow down the search and finally select a pokemon. The list is fetched from the pokeAPI, which returns a list with all pokemons that exist in the games. 
### searchPresenter.jsx
Passes along the list of pokemons as the data attribute from showPokemonPromiseState, and methods required for the dropdown menu to function correctly.
### Root.jsx
In the root we render the app, We render the app if the state is ready, else the suspenseView is rendered. The app always renders the menuBar, for the other views we use the router to render different views according to the current windowhash.
### damageCalcPresenter.jsx
In damageCalcPresenter.jsx, we read all damage related values from Redux and render damageCalcView the current values and dispatching change-handlers. When the user triggers a calculation, we validate the required inputs, call @smogon/calc with the selected values and then store either the computed damage or error back in Redux.
### damageCalcView.jsx
In damageCalcView.jsx, we render a MUI form with attacker and defender information along with field condiditions to the left and a result panel to the right. All fields are controlled via props and callback props, and submitting the form calls onCalculate while either showing an error message or the computed damage description and range.
### summaryPresenter.jsx + summaryView.jsx
Stubs, not in use
### utilities.js
Contains various utility functions.
### style.css
Contains various css stylings for classes and other objects.
### index.jsx
In index.jsx, we connect the Redux store to Firestore persistence and then mount the React app by rendering Root inside a Redux Provider into the DOM element with id "root".
### firebaseConfig.js
In firebaseConfig.js, we export the firebaseConfig object, which contains the Firebase project keys and identifiers used to initialize the app’s Firebase connection.
### firestoreModel.js
In firestoreModel.js, we initialize Firebase/Auth/Firestore and expose a connectToPersistence(store) function that syncs the Redux poke slice with a per-user Firestore document: it reacts to auth state changes, loads the user’s saved hello value into Redux on login, and writes back any subsequent hello changes when the model is ready. The “hello”-value is for now just a stub.
