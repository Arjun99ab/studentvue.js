import { LoginCredentials } from '../../utils/soap/Client/Client.interfaces';
import soap from '../../utils/soap/soap';
import Attachment from '../Attachment/Attachment';
import { MessageXMLObject } from './Message.xml';
import Icon from '../Icon/Icon';

/**
 * Message class
 * This is only returned as an array in `Client.messages()` method
 * @constructor
 * @extends {soap.Client}
 */
export default class Message extends soap.Client {
  /**
   * The URL to create POST fetch requests to synergy servers
   * @private
   * @readonly
   */
  private readonly hostUrl: string;

  /**
   * The message icon
   * @public
   * @readonly
   */
  public readonly icon: Icon;

  /**
   * The ID of the message
   * @public
   * @readonly
   */
  public readonly id: string;

  /**
   * The date when the message was first posted
   * @public
   * @readonly
   */
  public readonly beginDate;

  /**
   * The type of the message
   * @public
   * @readonly
   */
  public readonly type: string;

  /**
   * The HTML content of the message
   * @public
   * @readonly
   */
  public readonly htmlContent: string;

  /**
   * Whether the message has been read or not
   * @private
   */
  private read: boolean;

  /**
   * Whether the message is deletable or not
   * @private
   */
  private deletable: boolean;

  /**
   * The sender of the message
   * @public
   * @readonly
   * @property {string} name - The name of the sender
   * @property {string} staffGu - the staffGu of the sender
   * @property {string} email - The email of the sender
   * @property {string} smMsgPersonGu - The smMsgPersonGu of the sender. Don't know if this property has a real usage or not
   */
  public readonly from: {
    name: string;
    staffGu: string;
    email: string;
    smMsgPersonGu: string;
  };

  /**
   * The module of the sender
   * @public
   * @readonly
   */
  public readonly module: string;

  /**
   * The subject of the message
   * @public
   * @readonly
   * @property {string} html - The subject of the message with HTML
   * @property {string} raw - The subject of the message without HTML and formatting
   */
  public readonly subject: {
    html: string;
    raw: string;
  };

  /**
   * The attachments included in the message, if there are any.
   * @public
   * @readonly
   */
  public readonly attachments: Attachment[];

  constructor(
    xmlObject: MessageXMLObject['PXPMessagesData'][0]['MessageListings'][0]['MessageListing'][0],
    credentials: LoginCredentials,
    hostUrl: string
  ) {
    super(credentials);
    this.hostUrl = hostUrl;
    this.icon = new Icon(xmlObject['@_IconURL'][0], this.hostUrl);
    this.id = xmlObject['@_ID'][0];
    this.type = xmlObject['@_Type'][0];
    this.beginDate = xmlObject['@_BeginDate'][0];
    this.htmlContent = atob(xmlObject['@_Content'][0]);
    this.read = JSON.parse(xmlObject['@_Read'][0]);
    this.deletable = JSON.parse(xmlObject['@_Deletable'][0]);
    this.from = {
      name: xmlObject['@_From'][0],
      staffGu: xmlObject['@_StaffGU'][0],
      smMsgPersonGu: xmlObject['@_SMMsgPersonGU'][0],
      email: xmlObject['@_Email'][0],
    };
    this.module = xmlObject['@_Module'][0];
    this.subject = {
      html: xmlObject['@_Subject'][0],
      raw: xmlObject['@_SubjectNoHTML'][0],
    };
    this.attachments =
      typeof xmlObject.AttachmentDatas[0] !== 'string'
        ? xmlObject.AttachmentDatas[0].AttachmentData.map(
            (data) => new Attachment(data['@_AttachmentName'][0], data['@_SmAttachmentGU'][0], credentials)
          )
        : [];
  }

  /**
   * Check if a message has been read
   * @returns {boolean} Returns a boolean declaring whether or not the message has been previously read
   */
  public isRead(): boolean {
    return this.read;
  }

  /**
   * Check if a message is deletable
   * @returns {boolean} Returns a boolean declaring whether or not the message is deletable
   */
  public isDeletable(): boolean {
    return this.deletable;
  }

  private setRead(read: boolean) {
    this.read = read;
  }

  private setDeletable(deletable: boolean) {
    this.deletable = deletable;
  }

  /**
   * Marks the message as read
   * @returns Returns true to show that it has been marked as read
   * @description
   * ```js
   * const messages = await client.messages();
   * messages.every((msg) => msg.isRead()) // -> false
   * messages.forEach(async (msg) => !msg.isRead() && await msg.markAsRead());
   * messages.every((msg) => msg.isRead()) // -> true
   * const refetchedMessages = await client.messages(); // See if it updated on the server
   * messages.every((msg) => msg.isRead()) // -> true
   * ```
   * @description
   * ```tsx
   * // In a React project...
   * import React from 'react';
   *
   * const Message = (props) => {
   *  const { message } = props;
   *
   *  async function handleOnClick() {
   *    await message.markAsRead();
   *  }
   *
   *  return (
   *    <button onClick={handleOnClick} style={{ color: message.isRead() ? undefined : 'red' }}>
   *      <p>{message.subject.raw}</p>
   *    </button>
   *  )
   * }
   *
   * export default Message;
   * ```
   */
  public markAsRead(): Promise<true> {
    return new Promise<true>(async (res, rej) => {
      if (this.read) return res(true);
      try {
        await super.processRequest({
          methodName: 'UpdatePXPMessage',
          paramStr: {
            childIntId: 0,
            MessageListing: {
              '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
              '@_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
              '@_ID': this.id,
              '@_Type': this.type,
              '@_MarkAsRead': 'true',
            },
          },
        });
        this.setRead(true);

        res(true);
      } catch (e) {
        rej(e);
      }
    });
  }
}
