export class BoughtItemModel {
  constructor(
    public userId: string,
    public itemName: string,
    public sellerId: string,
    public sellerUsername: string,
    public price: string,
    public itemInformation: string,
    public image: string,
    public itemId: string,
    public boughtDate: Date,
    public cartId: string,
    public boughtId?: string){
  }
}