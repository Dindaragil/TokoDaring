import React from "react";
import axios from "axios";
import $ from "jquery";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alamat: [],

      carts: [],
      total: 0
    };
  }

  getCarts = () => {
    let items = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    let total = 0;

    items.forEach(item => {
      total += item.total;
    });
    this.setState({
      carts: items,

      total: total
    });
  };

  get_alamat = () => {
    $("#loading").toast("show");
    let item = JSON.parse(localStorage.getItem("id_user"));
    this.setState({
      id: item
    });
    let url = "http://localhost/toko_daring/public/alamat/" + item;
    axios
      .get(url)
      .then(res => {
        this.setState({ alamat: res.data.alamat });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getCarts();
    this.get_alamat();
  }

  render() {
    const { carts, total } = this.state;
    return (
      <div className="checkout container">
        <hr />
        <h3 className="card-title">Checkout</h3>
        <hr />

        <hr />

        <div class="card">
          <div class="card-body">
            <div className="">
              <h5 className="font-weight-bold">
                <span style={{ float: "left", marginLeft: "50px" }}>
                  Alamat
                </span>{" "}
                <br />
              </h5>
            </div>
            {this.state.alamat.map(item => {
              return (
                <div style={{ float: "left", marginLeft: "50px" }}>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                    />
                    <label
                      class="form-check-label float-left"
                      for="inlineCheckbox1"
                    >
                      <div key={item.id_alamat} className="mt-3">
                        <p className="text-gray">
                          Penerima : {item.namapen} Kodepos: {item.kodepos}, RT:{" "}
                          {item.rt}, RW: {item.rw}, Kecamatan: {item.kecamatan},
                          Kota: {item.kota}, Provinsi: {item.provinsi}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div class="card mt-3">
          <div class="card-body">
            <div className="row">
              <div className="col-6">
                <h5 className="font-weight-bold">
                  <span style={{ float: "left", marginLeft: "50px" }}>
                    Produk yang dibeli
                  </span>
                </h5>
              </div>
              <div className="col-2">
                <h5 className="font-weight-bold">Harga</h5>
              </div>
              <div className="col-2">
                <h5 className="font-weight-bold">Kuantitas</h5>
              </div>
              <div className="col-2">
                <h5 className="font-weight-bold">Subtotal</h5>
              </div>
            </div>

            {carts.map((product, index) => (
              <div key={index}>
                <div className="row">
                  <div className="col-6">
                    <h6>
                      <span style={{ float: "left", marginLeft: "50px" }}>
                        {product.nama_barang}
                      </span>
                    </h6>
                  </div>
                  <div className="col-2">
                    <h6>{product.harga}</h6>
                  </div>
                  <div className="col-2">
                    <h6>{product.qty}</h6>
                  </div>
                  <div className="col-2">
                    <h6>{product.total}</h6>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <h5 className="font-weight-bold">
                <span style={{ float: "left", marginLeft: "50px" }}>
                  Total Harga:
                </span>

                <span className="float-right mr-5">Rp. {total}</span>
              </h5>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-primary mt-3  ">
          Continue to Payment
        </button>
      </div>
    );
  }
}

export default Checkout;
