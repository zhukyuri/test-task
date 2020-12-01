import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingsForm } from './SettingsForm';
import { getPages } from './settingsSlice';

export function Settings() {
  const dispatch = useDispatch();
  const { pages, loading } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getPages());
  }, [dispatch]);

  return (
    <div className="App">
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <SettingsForm onSubmit={console.log} pages={pages}/>
      )}
    </div>
  );
}
