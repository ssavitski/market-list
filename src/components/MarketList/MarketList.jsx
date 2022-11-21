import React from "react";

import "./marketList.css";

const MarketList = ({ items }) => {
  return (
    <section className="market-list-wrapper">
      <h1>Market list</h1>
      {
        items.length ? (
          <table className="market-list">
            <thead>
              <tr>
                <th>no</th>
                <th>market name</th>
                <th>size</th>
                <th>level</th>
              </tr>
            </thead>
            <tbody>
              {
                items.map(({ size, level, marketName }, index) => (
                  <tr key={`${marketName}${index}`}>
                    <td>{index + 1}</td>
                    <td>{marketName}</td>
                    <td>{size}</td>
                    <td>{level}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : <p>There is no data</p>
      }
    </section>
  );
};

export default MarketList;