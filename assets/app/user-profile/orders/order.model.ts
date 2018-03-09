export class OrderModel {
  constructor(public items: {
                itemName: string,
                sellerUsername: string,
                price: string,
                image: string,
                itemId: string,
                cartId?: string
              }[],
              public payment: {
                method: string
              },
              public shipping: {
                customerFirstName: string,
                customerLastName: string,
                address: string,
                city: string,
                state: string,
                zipcode: string,
                country: string,
                delivery_notes: string
              },
              public orderDate: Date,
              public userId?: string,
              public orderId?: string) {
  }
}
