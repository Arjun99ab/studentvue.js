import { Base64String } from '../../utils/types';
import { LoginCredentials } from '../../utils/soap/Client/Client.interfaces';
import soap from '../../utils/soap/soap';
/**
 * Attachment class
 * This is a class used to define message attachments
 * @constructor
 * @extends {soap.Client}
 */
export default class Attachment extends soap.Client {
    /**
     * The name of the attachment.
     * @type {string}
     * @public
     * @readonly
     */
    readonly name: string;
    /**
     * the GU of the attachment.
     * @type {string}
     * @public
     * @readonly
     */
    readonly attachmentGu: string;
    /**
     * The file extension of the attachment extracted using regex
     * @type {string | null}
     * @public
     * @readonly
     */
    readonly fileExtension: string | null;
    constructor(name: string, attachmentGu: string, session: LoginCredentials);
    /**
     * Fetches the attachment from synergy servers.
     * Unfortunately, the api does not offer a URL path to the file
     * @returns {string} base64 string
     *
     * @description
     * ```js
     * const base64 = await someAttachment.get();
     * console.log(base64) // -> UEsDBBQABgAIAAAAIQCj77s...
     * ```
     */
    get(): Promise<Base64String>;
}
