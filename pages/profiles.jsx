import React from "react";
import Link from 'next/link';
import Head from 'next/head';

export default function Profiles() {
  return (
    <div className="profile_page">
      <Head>
        <title>Profile</title>
      </Head>

      <section className="row text-secondary my-3">
        <div className="col-md-4">
          {/* <h3 className="text-center text-uppercase">
            {auth.user.role === "user" ? "User Profile" : "Admin Profile"}
          </h3> */}

          <div className="avatar">
            <img src="http://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-20.jpg" alt="" />
            <span>
              <i className="fas fa-camera"></i>
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                // onChange={changeAvatar}
              />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
            //   value={name}
              className="form-control"
              placeholder="Your name"
            //   onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
            //   defaultValue={auth.user.email}
              className="form-control"
              disabled={true}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
            //   value={password}
              className="form-control"
              placeholder="Your new password"
            //   onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cf_password">Confirm New Password</label>
            <input
              type="password"
              name="cf_password"
            //   value={cf_password}
              className="form-control"
              placeholder="Confirm new password"
            //   onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-info"
            // disabled={notify.loading}
            // onClick={handleUpdateProfile}
          >
            Update
          </button>
        </div>

        <div className="col-md-8">
          <h3 className="text-uppercase">Orders</h3>

          <div className="my-3 table-responsive">
            <table
              className="table-bordered table-hover w-100 text-uppercase"
              style={{ minWidth: "600px", cursor: "pointer" }}
            >
              <thead className="bg-light font-weight-bold">
                <tr>
                  <td className="p-2">id</td>
                  <td className="p-2">date</td>
                  <td className="p-2">total</td>
                  <td className="p-2">delivered</td>
                  <td className="p-2">paid</td>
                </tr>
              </thead>

              {/* <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="p-2">
                      <Link href={`/order/${order._id}`}>
                        <a>{order._id}</a>
                      </Link>
                    </td>
                    <td className="p-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">${order.total}</td>
                    <td className="p-2">
                      {order.delivered ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                    <td className="p-2">
                      {order.paid ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
