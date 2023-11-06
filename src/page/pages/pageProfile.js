import { PageHTML } from "../core/pageHTML.js";


export class PageProfile extends PageHTML {

    constructor(path) {
        super(path);
        this.isPageProfile = true;

        this.id = -1;
        this.screenName = null;
        this.status = null;
        this.firstName = null;
        this.verifFirstName = null;
        this.lastName = null;
        this.verifLastName = null;
        this.sex = null;
        this.verifSex = null;
        this.birthDate = null;
        this.verifBirthDate = null;
        this.birthDateVisibility = null;
        this.city = null;
        this.country = null;
        this.cityID = null;
        this.countryID = null;
        this.phone = null;
        this.relation = null;
        this.homeTown = null;
        this.photo = null;
        this.isServiceAccount = null;
        this.isESIAVerified = null;
        this.isESIALinked = null;
        this.isTinkoffLinked = null;
        this.isTinkoffVerified = null;
        this.isSberVerified = null;
        this.oauthLinked = null;
        this.oauthVerification = null;
        this.verificationStatus = null;
        this.promoVerifications = null;
    }

    generate(data) {
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
        this.verifBirthDate = data.verifBirthDate;
        this.birthDateVisibility = data.birthDateVisibility;
        this.city = data.city;
        this.country = data.country;
        this.cityID = data.cityID;
        this.countryID = data.countryID;
        this.phone = data.phone;
        this.relation = data.relation;
        this.homeTown = data.homeTown;
        this.photo = data.photo;
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

        super.generate({
            html: {
                head: [
                    {
                        type: "meta",
                        params: {
                            charset: "utf-8"
                        }
                    },
                    {
                        type: "title",
                        value: `${ this.id }_${ this.lastName }_${ this.firstName }`
                    }
                ],
                body: [
                    {
                        type: "div",
                        params: { class: "class1" },
                        value: {
                            type: "h1",
                            value: `${ this.lastName } ${ this.firstName }`
                        }
                    }
                ]
            }
        });
    }
}