export class SellingItemModel {
  constructor(
    public userId: string,
    public itemName: string,
    public sellerId: string,
    public sellerUsername: string,
    public price: string,
    public itemInformation: string,
    public image: string,
    public active: boolean,
    public itemId: string,
    public cartId?: string){
  }
}