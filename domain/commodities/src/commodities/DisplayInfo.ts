import { isURL } from "class-validator";

export class DisplayInfo {
  private _primaryPicture: string;
  private _pictures: string[];
  private _description: string;
  private _labelId: string;

  constructor(primaryPicture: string, pictures: string[], description: string, labelId: string) {
    if (!isURL(primaryPicture)) {
      throw new Error("图片地址必须是一个有效的链接");
    }

    if (pictures.some((url) => !isURL(url))) {
      throw new Error("图片地址必须是一个有效的链接");
    }

    this._primaryPicture = primaryPicture;
    this._pictures = pictures;
    this._description = description;
    this._labelId = labelId;
  }
}
