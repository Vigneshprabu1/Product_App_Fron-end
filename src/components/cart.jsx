import React, { Component } from 'react';
import './cart.css'
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      combine1: [],
      combine: [],
    }
    // this.get=this.get.bind(this);
    this.state.combine = JSON.parse(localStorage.getItem("final"));
    console.log(this.state.combine)
    // this.setState({combine:this.state.combine})

  }
    Remove(){
   // localStorage.setItem("final");
    localStorage.removeItem("final");
    window.location.reload("/");
    }



  //    this.setState({combine1:localStorage.getItem("manoj")});

  render() {
    console.log((this.state.combine));
    if (this.state.combine == []) {
      console.log('alling get');

    }
    return (
      <div>
        {this.state.combine != undefined ? (
          <div  >
            {/* <h1>YOUR CART DETAILS BELOW:</h1>
              
              
                  <table className="table table-bordered">
                          <thead>
                            <tr><th>ID</th>
                              <th>Image</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Product category</th>
                              <th>Shop category</th>
                              <th>Short description</th>
                              <th>Long Description</th>
                              <th>Size</th>
                              <th>Ratings</th>
                              <th>Discount</th>
                              <th>Brand name</th>
                              <th>Sku</th>
                              <th>Tax</th>
                              <th>Product id</th>
                              <th>TotalPrice</th>
                            </tr>
                            </thead>
                            <tbody>
                          {this.state.combine!=undefined ? (   this.state.combine.map(a =>
                               <tr > <td>{a.Id1}</td>
                                <td><img src={a.img} className="img-thumbnail"  />
                                </td><td>{a.name}</td>
                                <td>{a.price}</td><td>
                          {a.quantity}</td>
                          <td>{a.prodCategory}</td>
                          <td>{a.shopCategory}</td>
                          <td>{a.shortDesc}</td>
                          <td>{a.longDesc}</td>
                          <td>{a.size}</td>
                          <td>{a.rating}</td>
                          <td>{a.discount}</td>
                          <td>{a.randName}</td>
                          <td>{a.sku}</td>
                          <td>{a.tax}</td>
                          <td>{a.prodId}</td>
                          <td>{a.total}</td>
                          </tr> 
                                ) ):(
                                    alert("please sign in first")
                                )}
                          </tbody></table> */}

            <div className="wrap cf">
              <h1 className="projTitle">Responsive Table<span>-Less</span> Shopping Cart</h1>
              <div className="heading cf">
                <h1>My Cart</h1>
                <a href="/" className="continue">Continue Shopping</a>
              </div>
              <div className="cart">
                {/* <ul className="tableHead">
              <li className="prodHeader">Product</li>
              <li>Quantity</li>
              <li>Total</li>
              <li>Remove</li>
                </ul> */}

                {this.state.combine.map(a =>
                  <li className="items even">
                    <div className="infoWrap">
                      <div className="cartSection info">

                        <img src={a.product_image} alt="" className="itemImg" style={{width:"35%",height:"30%"}} />
                        {/* <p className="itemNumber">#QUE-007544-002</p> */}<br/>
                        <h3>{a.product_name}</h3>

                        <p> <input type="text" className="qty" placeholder={a.quantity} /> x ₹{a.price}</p>

                        <p className="stockStatus"> In Stock</p>

                      </div>


                      <div className="prodTotal cartSection">
                        <p>₹{a.total}</p>
                      </div>

                      <div className="cartSection removeWrap">
                        <a  className="remove" onClick={() => this.Remove(a.id)}>x</a>
                      </div>
                    </div>
                    {/* <div className="special"><div className="specialContent">Free gift with purchase!, gift wrap, etc!!</div></div> */}
                  </li>
                )}

                {/* <!--<li className="items even">Item 2</li>--> */}


              </div>

              {/* <div className="promoCode"><label for="promo">Have A Promo Code?</label><input type="text" name="promo" placholder="Enter Code" />
                <a href="#" className="btn"></a></div> */}
              {this.state.combine.map(a =>
                <div className="subtotal cf">
                  <ul>
                    <li className="totalRow"><span className="label">Subtotal</span><span className="value">₹{a.total}.00</span></li>

                    <li className="totalRow"><span className="label">Shipping</span><span className="value">₹5.00</span></li>

                    <li className="totalRow"><span className="label">GST</span><span className="value">₹4.00</span></li>
                    <li className="totalRow final"><span className="label">Total</span><span className="value">₹{a.total + 5 + 4}.00</span></li>
                    <li className="totalRow"><a href="/checkout" className="btn continue">Checkout</a></li>
                  </ul>
                </div>
              )}
            </div>
          </div>) : (
            alert("Cart is Empty", this.props.history.push("/"))
           
          )}
      </div>
    )
  }
}
export default Cart;