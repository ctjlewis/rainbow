import { useRoute } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import lang from 'i18n-js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { saveBackupPassword } from '../../model/backup';
import { DelayedAlert } from '../alerts';
import { PasswordField } from '../fields';
import { Centered, Column } from '../layout';
import { GradientText, Text } from '../text';
import BackupSheetKeyboardLayout from './BackupSheetKeyboardLayout';
import {
  cloudBackupPasswordMinLength,
  isCloudBackupPasswordValid,
} from '@rainbow-me/handlers/cloudBackup';
import {
  useBooleanState,
  useRouteExistsInNavigationState,
  useWalletCloudBackup,
  useWallets,
} from '@rainbow-me/hooks';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';
import { colors, margin, padding } from '@rainbow-me/styles';
import logger from 'logger';

const DescriptionText = styled(Text).attrs({
  align: 'center',
  color: colors.alpha(colors.blueGreyDark, 0.5),
  lineHeight: 'looser',
  size: 'large',
})`
  ${padding(0, 50)};
`;

const Masthead = styled(Centered).attrs({
  direction: 'column',
})`
  ${padding(24, 0, 42)}
  flex-shrink: 0;
`;

const MastheadIcon = styled(GradientText).attrs({
  align: 'center',
  angle: false,
  colors: ['#FFB114', '#FF54BB', '#00F0FF'],
  end: { x: 0, y: 0 },
  letterSpacing: 'roundedTight',
  size: 52,
  start: { x: 1, y: 1 },
  steps: [0, 0.5, 1],
  weight: 'bold',
})``;

const Title = styled(Text).attrs({
  size: 'big',
  weight: 'bold',
})`
  ${margin(15, 0, 12)};
`;

export default function BackupConfirmPasswordStep() {
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const walletCloudBackup = useWalletCloudBackup();
  const [validPassword, setValidPassword] = useState(false);
  const [
    passwordFocused,
    setPasswordFocused,
    setPasswordBlurred,
  ] = useBooleanState(true);
  const [password, setPassword] = useState('');
  const [label, setLabel] = useState('􀎽 Confirm Backup');
  const passwordRef = useRef();
  const { selectedWallet, setIsWalletLoading } = useWallets();
  const walletId = params?.walletId || selectedWallet.id;

  const isSettingsRoute = useRouteExistsInNavigationState(
    Routes.SETTINGS_MODAL
  );

  useEffect(() => {
    analytics.track('Confirm Password Step', {
      category: 'backup',
      label: 'icloud',
    });
  }, []);

  useEffect(() => {
    let passwordIsValid = false;

    if (isCloudBackupPasswordValid(password)) {
      passwordIsValid = true;
      setLabel(`􀑙 Add to iCloud Backup`);
    }
    setValidPassword(passwordIsValid);
  }, [password, passwordFocused]);

  const onPasswordChange = useCallback(
    ({ nativeEvent: { text: inputText } }) => {
      setPassword(inputText);
    },
    []
  );

  const onError = useCallback(
    msg => {
      passwordRef.current?.focus();
      setIsWalletLoading(null);
      DelayedAlert({ title: msg }, 500);
    },
    [setIsWalletLoading]
  );

  const onSuccess = useCallback(async () => {
    logger.log('BackupConfirmPasswordStep:: saving backup password');
    await saveBackupPassword(password);
    if (!isSettingsRoute) {
      DelayedAlert({ title: lang.t('icloud.backup_success') }, 1000);
    }
    // This means the user didn't have the password saved
    // and at least an other wallet already backed up
    analytics.track('Backup Complete via Confirm Step', {
      category: 'backup',
      label: 'icloud',
    });
    goBack();
  }, [goBack, isSettingsRoute, password]);

  const onSubmit = useCallback(async () => {
    if (!validPassword) return;
    await walletCloudBackup({
      onError,
      onSuccess,
      password,
      walletId,
    });
  }, [
    onError,
    onSuccess,
    password,
    validPassword,
    walletCloudBackup,
    walletId,
  ]);

  return (
    <BackupSheetKeyboardLayout
      footerButtonDisabled={!validPassword}
      footerButtonLabel={label}
      onSubmit={onSubmit}
    >
      <Masthead>
        <MastheadIcon>􀙶</MastheadIcon>
        <Title>Enter backup password</Title>
        <DescriptionText>
          To add your wallet to the iCloud backup, enter the backup password
        </DescriptionText>
      </Masthead>
      <Column align="center" flex={1}>
        <PasswordField
          autoFocus
          isInvalid={
            password !== '' &&
            password.length < cloudBackupPasswordMinLength &&
            !passwordRef?.current?.isFocused?.()
          }
          onBlur={setPasswordBlurred}
          onChange={onPasswordChange}
          onFocus={setPasswordFocused}
          onSubmitEditing={onSubmit}
          password={password}
          placeholder="Backup Password"
          ref={passwordRef}
        />
      </Column>
    </BackupSheetKeyboardLayout>
  );
}