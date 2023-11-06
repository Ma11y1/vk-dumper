import { Dumper } from "./dumper.js";
import { DUMP_TYPE } from "../constants.js";
import { Config } from "../config.js";
import { StorageDumper } from "../storage.js";
import { PageProfile } from "../page/index.js";


export class DumperProfile extends Dumper {

    constructor(dump) {
        super(dump);
        this._page = new PageProfile(`${ Config.pathDump.profile }/${ this._session.id }_${ this._session.lastName }_${ this._session.firstName }/profile.html`);
        this._page.addFileStyle(StorageDumper.get("style").base);
        this._page.addFileStyle(StorageDumper.get("style").profile);

        this._dump.setPage(DUMP_TYPE.PROFILE, this._page);
    }

    async start() {
        if(this.isStop) {
            return;
        }
        console.log(11)

        await super.start();

        this._page.generate({
            id: this._session.id,
            screenName: this._session.screenName,
            status: this._session.status,
            firstName: this._session.firstName,
            verifFirstName: this._session.verifFirstName,
            lastName: this._session.lastName,
            verifLastName: this._session.verifLastName,
            sex: this._session.sex,
            verifSex: this._session.verifSex,
            birthDate: this._session.birthDate,
            verifBirthDate: this._session.verifBirthDate,
            birthDateVisibility: this._session.birthDateVisibility,
            city: this._session.cityTitle,
            country: this._session.countryTitle,
            cityID: this._session.cityID,
            countryID: this._session.countryID,
            phone: this._session.phone,
            relation: this._session.relation,
            homeTown: this._session.homeTown,
            photo: this._session.photo,
            isServiceAccount: this._session.isServiceAccount,
            isESIAVerified: this._session.isESIAVerified,
            isESIALinked: this._session.isESIALinked,
            isTinkoffLinked: this._session.isTinkoffLinked,
            isTinkoffVerified: this._session.isTinkoffVerified,
            isSberVerified: this._session.isSberVerified,
            oauthLinked: this._session.oauthLinked,
            oauthVerification: this._session.oauthVerification,
            verificationStatus: this._session.verificationStatus,
            promoVerifications: this._session.promoVerifications,
        });

        if(this._dump.isForceWriteFile) {
            await this._page.write();
        }

        this._dump.complete(DUMP_TYPE.PROFILE);

        return this._page;
    }

}