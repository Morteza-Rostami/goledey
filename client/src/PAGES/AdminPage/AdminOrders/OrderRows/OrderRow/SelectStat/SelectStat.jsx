import React, { useMemo } from 'react';

import { SelectPicker } from 'rsuite';
import CONST from '../../../../../../CONSTANTS/CONST';

/* const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
); */

const statuses = [
  {
    label: 'جاری', value: CONST.ONGOING,
  },
  {
    label: 'تحویل شده', value: CONST.DELIVERED,
  },
  {
    label: 'مرجوع شده', value: CONST.CANCELED,
  },
  {
    label: 'پرداخت ناموفق', value: CONST.UNPAID,
  },
] 

const SelectStat = ({
  newStatus,
  setNewStatus
}) => {
  //const [value, setValue] = React.useState(null);

  /* const data = useMemo(() => {
    return statuses.map((stat, i) => ({ label: stat.label, }))
  }); */

  return <SelectPicker 
            value={newStatus} 
            onChange={setNewStatus} 
            data={statuses} 
            style={{ width: 150 }} />;
};

export default SelectStat