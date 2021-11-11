// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
let covid = require('novelcovid');

const skillBuilder = Alexa.SkillBuilders.custom();

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        // const speakOutput = 'Bienvenido';
        // return handlerInput.responseBuilder
        //     .speak(speakOutput)
        //     .reprompt(speakOutput)
        //     .getResponse();
        const {responseBuilder} = handlerInput;
        const coronavirus = await covid.countries("spain");
        const coronavirus2 = await covid.jhucsse({country: "Spain"});

        // console.log(coronavirus,coronavirus2);

        const speakOutput = `En españa hay un total de ${coronavirus2[0].stats.confirmed} casos activos en coronavirus, de los cuales
                             ${coronavirus2[0].stats.recovered} se han recuperado y ${coronavirus2[0].stats.deaths} han fallecido.
                             Hoy ha habido ${coronavirus.todayCases} nuevos positivos y ${coronavirus.todayDeaths} han fallecido.
                             Esto es lo que mi dueño Pedro me ha enseñado, espera que esteis todos bien y que pronto os veais familia.`;

        return responseBuilder
            .speak(speakOutput)
            // .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const CovidIntentHandler = {
    canHandle(handlerInput) {

        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CovidIntent';
    },
    async handle(handlerInput) {
        const {responseBuilder} = handlerInput;
        const coronavirus = await covid.countries("spain");
        const coronavirus2 = await covid.jhucsse({country: "Spain"});

        // console.log(coronavirus,coronavirus2);

        const speakOutput = `En españa hay un total de ${coronavirus2[0].stats.confirmed} casos activos en coronavirus, de los cuales
                             ${coronavirus2[0].stats.recovered} se han recuperado y ${coronavirus2[0].stats.deaths} han fallecido.
                             Hoy ha habido ${coronavirus.todayCases} nuevos positivos y ${coronavirus.todayDeaths} han fallecido`;

        return responseBuilder
            .speak(speakOutput)
            // .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();

    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = '!Hola! Puedo informarte del estado actual de los casos de covid actuales en Esapaña diciendo : Estado de coronavirus en españa';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        // console.log(handlerInput.requestEnvelope);
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Acabas de disparar ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Lo siento, tuve problemas para hacer lo que me pediste. Inténtalo de nuevo.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        CovidIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
