export class Item {
  constructor(public itemName: string,
              public sellerId: string,
              public sellerUsername: string,
              public price: string,
              public itemInformation: string,
              public image: string,
              public active: boolean,
              public itemId?: string,
              public buyerId?: string){
    }
}
