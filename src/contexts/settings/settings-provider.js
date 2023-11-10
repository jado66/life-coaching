import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { SettingsContext, initialState, defaultSettings } from './settings-context';
import { useUser } from 'src/hooks/use-user';

const STORAGE_KEY = 'app.settings';

const restoreSettings = () => {
  let value = null;

  try {
    const restored = window.localStorage.getItem(STORAGE_KEY);

    if (restored) {
      value = JSON.parse(restored);
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return value;
};

const deleteSettings = () => {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error(err);
  }
};

const storeSettings = (value) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

export const SettingsProvider = (props) => {
  const { children } = props;

  const { user } = useUser();
  const [state, setState] = useState({
    ...initialState,
    accountType: user ? user.accountType : 'guest',
  });

  useEffect(() => {
    if (user) {
      setState((prevState) => ({
        ...prevState,
        accountType: user.accountType,
      }));
    }
  }
  , [user]);

  useEffect(() => {

    if (!user || !state.accountType) {
      return;
    }

    const isImpersonating = state.accountType !== user.accountType;

    console.log(state.accountType, user.accountType, isImpersonating)

    setState((prevState) => ({
      ...prevState,
      isImpersonating,
    }));
  }
  , [user, state.accountType]);

  useEffect(() => {
    const restored = restoreSettings();

    if (restored) {
      setState((prevState) => ({
        ...prevState,
        ...restored,
        isInitialized: true,
      }));
    }
  }, []);

  const handleReset = useCallback(() => {
    deleteSettings();
    setState((prevState) => ({
      ...prevState,
      ...defaultSettings,
    }));
  }, []);

  const handleUpdate = useCallback((settings) => {
    setState((prevState) => {
      storeSettings({
        accountType: prevState.accountType,
        colorPreset: prevState.colorPreset,
        contrast: prevState.contrast,
        direction: prevState.direction,
        layout: prevState.layout,
        navColor: prevState.navColor,
        paletteMode: prevState.paletteMode,
        responsiveFontSizes: prevState.responsiveFontSizes,
        stretch: prevState.stretch,
        ...settings,
      });

      return {
        ...prevState,
        ...settings,
      };
    });
  }, []);

  const handleDrawerOpen = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      openDrawer: true,
    }));
  }, []);

  const handleDrawerClose = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      openDrawer: false,
    }));
  }, []);

  const isCustom = useMemo(() => {
    return !isEqual(defaultSettings, {
      accountType: state.accountType,
      colorPreset: state.colorPreset,
      contrast: state.contrast,
      direction: state.direction,
      layout: state.layout,
      navColor: state.navColor,
      paletteMode: state.paletteMode,
      responsiveFontSizes: state.responsiveFontSizes,
      stretch: state.stretch,
    });
  }, [state]);

  const resetAccountType = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      accountType: user.accountType,
    }));
  }, [user]);

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        handleDrawerClose,
        handleDrawerOpen,
        handleReset,
        handleUpdate,
        isCustom,
        resetAccountType
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
