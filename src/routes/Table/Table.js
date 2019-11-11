import React, {Component} from 'react';

import styles from './Table.module.scss';

import {data} from 'consts';

const statusList = [];
data.data.forEach(i => {
  if(statusList.indexOf(i.status) === -1) {
    statusList.push(i.status);
  }
});

class Table extends Component {
  state = {
    data: {
      cols: ['Checked', ...JSON.parse(JSON.stringify(data.cols))],
      data: JSON.parse(JSON.stringify(data.data)).map(i => ({ checked: false, ...i }))
    },
    sorting: {}
  }

  sort = (type) => {
    const {
      data,
      sorting,
    } = this.state;

    let newData = data.data;
    const isAsc = sorting[type] === 'asc';
    const factor = (isAsc ? 1 : -1);

    newData = newData.sort((a, b) => {
      switch(type) {
        case 'Number':
          return (b.number - a.number) * factor;
        case 'Name':
          return (a.name).localeCompare(b.name) * -factor;
        case 'Date':
          let date1 = new Date('20' + a.date.substr(6), +a.date.substr(0,2) - 1, a.date.substr(3,2)).getTime();
          let date2 = new Date('20' + b.date.substr(6), +b.date.substr(0,2) - 1, b.date.substr(3,2)).getTime();
          return (date2 - date1) * factor;
        case 'Status':
          return (a.status).localeCompare(b.status) * -factor;
        default:
          return 0;
      }
    });

    this.setState({
      data: {
        ...data,
        data: newData,
      },
      sorting: {
        [type]: isAsc ? 'des' : 'asc',
      },
    });
  }

  render() {
    const {
      data,
      sorting,
    } = this.state;

    const allChecked = data.data.filter(i => i.checked).length === data.data.length;

    return (
      <div className={styles.container}>
        <h1>
          Table
        </h1>
        <table>
          <thead>
            <tr>
              <th>
                <div className={`${styles.thInner} ${styles._checkbox}`}>
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={() => {
                      data.data.forEach(i => i.checked = !allChecked);
                      this.setState({data});
                    }}
                  />
                </div>
              </th>
              {data.cols.map(i => i !== 'Checked' ?
                <th key={i} onClick={() => this.sort(i)}>
                  <div className={styles.thInner}>
                    {i}
                    {' '}
                    {sorting[i] &&
                      <span className={`${styles.sorting} ${sorting[i] === 'asc' ? styles._asc : styles._des}`}></span>
                    }
                  </div>
                </th>
                : null
              )}
            </tr>
          </thead>
          <tbody>
            {data.data.map((i, k) => {
              return (
                <tr key={k}>
                  {Object.keys(i).map(ii => (
                    <td key={`${k}-${ii}`}>
                      {(() => {switch(ii) {
                        case 'checked':
                          return (
                            <div className={`${styles.tdInner} ${styles._checkbox}`}>
                              <input
                                type="checkbox"
                                checked={i.checked}
                                onChange={() => {
                                  i.checked = !i.checked;
                                  this.setState({data});
                                }}
                              />
                            </div>
                          );
                        case 'name':
                          return (
                            <div className={`${styles.tdInner} ${styles._checkbox}`}>
                              <input
                                className={styles.name}
                                type="type"
                                value={i[ii]}
                                onChange={({target}) => {
                                  i[ii] = target.value;
                                  this.setState({data});
                                }}
                              />
                            </div>
                          );
                        case 'status':
                          return (
                            <div className={`${styles.tdInner} ${styles._checkbox}`}>
                              <select
                                value={i[ii]}
                                onChange={({target}) => {
                                  i[ii] = target.value;
                                  this.setState({data});
                                }}
                              >
                                <option value="">--select option--</option>
                                {statusList.map(i => (
                                  <option value={i} key={i}>
                                    {i}
                                  </option>
                                ))}
                              </select>
                            </div>
                          );
                        default:
                          return i[ii];
                      }})()}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table;
