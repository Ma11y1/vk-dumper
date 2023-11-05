import { PageHTML } from "../core/pageHTML.js";


export class PageProfile extends PageHTML {

    constructor(path, data) {
        super(path);
        this.isPageProfile = true;
        this.id = data.id;
        this.screenName = data.screenName;
        this.status = data.status;
        this.firstName = data.firstName;
        this.verifFirstName = data.verifFirstName;
        this.lastName = data.lastName;
        this.verifLastName = data.verifLastName;
        this.sex = data.sex;
        this.verifSex = data.verifSex;
        this.birthDate = data.birthDate;
        this.birthDateTS = data.birthDateTS;
        this.verifBirthDate = data.verifBirthDate;
        this.verifBirthDateTS = data.verifBirthDateTS;
        this.birthDateVisibility = data.birthDateVisibility;
        this.cityID = data.cityID;
        this.cityTitle = data.cityTitle;
        this.countryID = data.countryID;
        this.countryTitle = data.countryTitle;
        this.phone = data.phone;
        this.relation = data.relation;
        this.homeTown = data.homeTown;
        this.photo = data.photo;
        this.language = data.language;
        this.isServiceAccount = data.isServiceAccount;
        this.isESIAVerified = data.isESIAVerified;
        this.isESIALinked = data.isESIALinked;
        this.isTinkoffLinked = data.isTinkoffLinked;
        this.isTinkoffVerified = data.isTinkoffVerified;
        this.isSberVerified = data.isSberVerified;
        this.oauthLinked = data.oauthLinked;
        this.oauthVerification = data.oauthVerification;
        this.verificationStatus = data.verificationStatus;
        this.promoVerifications = data.promoVerifications;
    }

    generate(data) {

    }
}