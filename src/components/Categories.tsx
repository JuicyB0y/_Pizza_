import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setCategoryId } from '../redux/slices/filterSlice';

const categoriesArr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  // const categoryId = useSelector((state) => state.filter.categoryId);
  // const dispatch = useDispatch();

  // const changeActive = (i: number) => {
  //   setActiveIndex(i);
  //   dispatch(setCategoryId(i));
  //   onChangeCategory(i);
  // };

  return (
    <div className="categories">
      <ul>
        {categoriesArr.map((item, i) => (
          <li key={item + i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
