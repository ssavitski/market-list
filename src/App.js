import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { groupBy, sumBy } from "lodash";

import MarketList from "./components/MarketList/MarketList";
import "./App.css";

function App() {
  const [markets, setMarkets] = useState([]);
  const [positions, setPositions] = useState([]);
  const [isAggregate, setIsAggregate] = useState(false);
  const items = useMemo(() => {
    const itemsArr = positions.map(({ size, level, direction, marketId }) => ({
      size: direction === 'buy' ? `+${size}` : `-${size}`,
      level,
      marketName: markets.find(({ id }) => id === marketId)?.name,
    }));

    if (!isAggregate) {
      return itemsArr;
    }

    return Object
      .values(groupBy(itemsArr, 'marketName'))
      .map((group) => {
        const size = sumBy(group, ({ size }) => +size);

        return {
          level: group[0].level,
          marketName: group[0].marketName,
          size: size > 0 ? `+${size}` : `${size}`,
        };
      });
  }, [markets, positions, isAggregate]);

  useEffect(() => {
    axios.get('https://a.c-dn.net/b/2efzdM.json#data.json')
      .then(function ({ data: { markets: m, positions: p } }) {
        setMarkets(m);
        setPositions(p);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <main className="app">
      <div className="switch-aggregate">
        <input
          type="checkbox"
          name="view"
          defaultChecked={isAggregate}
          onChange={() => setIsAggregate(!isAggregate)}
          id="view"
        />
        <label htmlFor="view">Aggregate positions</label>
      </div>

      <MarketList items={items} />
    </main>
  );
}

export default App;
