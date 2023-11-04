import { PageHTML } from "../core/pageHTML.js";
import { Config } from "../../config.js";


export class PageProfile extends PageHTML {

    constructor() {
        super(Config.pathDump.profile);
        this.isPageProfile = true;
    }

    generate() {

    }
}

// _id
// screenName
// status
// firstName
// verifFirstName
// lastName
// verifLastName
// sex
// verifSex
// birthDate
// birthDateTS
// verifBirthDate
// verifBirthDateTS
// birthDateVisibility
// cityID
// cityTitle
// countryID
// countryTitle
// phone
// relation
// homeTown
// photo
// _language
// isServiceAccount
// isESIAVerified
// isESIALinked
// isTinkoffLinked
// isTinkoffVerified
// isSberVerified
// oauthLinked
// oauthVerification
// verificationStatus
// promoVerifications