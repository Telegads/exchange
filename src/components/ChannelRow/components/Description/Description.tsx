import React, { FC, useCallback, useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { getHiddenText } from '../../utils';
import { MAX_PREVIEW_LENGTH, MIN_HIDDEN_TEXT_LENGTH } from '../../constants';
import { Button } from '../../../Button/Button';

import styles from './description.module.scss';

type DescriptionProps = {
  text: string;
};
export const Description: FC<DescriptionProps> = ({ text }) => {
  const router = useRouter();
  const searchWords = useMemo(() => [router.query.search as string], [router.query.search]);
  const isHiddenTextExists = text.length - MAX_PREVIEW_LENGTH >= MIN_HIDDEN_TEXT_LENGTH;
  const visibleText = text.slice(0, MAX_PREVIEW_LENGTH).trim();
  const maxPreviewLength = MAX_PREVIEW_LENGTH;
  const hiddenText = useMemo(() => getHiddenText(text, maxPreviewLength), [text]);

  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState<boolean>(Boolean(searchWords[0]) && hiddenText.includes(searchWords[0]));
  const onButtonClickHandle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  if (!isHiddenTextExists) {
    return <p>{text}</p>;
  }

  return (
    <p className={styles.text}>
      <Highlighter searchWords={searchWords} autoEscape={true} textToHighlight={isOpen ? text : visibleText} />
      {isOpen ? (
        <>
          {' '}
          <Button className={styles.button} variant="link" onClick={onButtonClickHandle}>
            {t('catalog.channelCard.hideButton')}
          </Button>
        </>
      ) : (
        <span>
          ...
          <Button className={styles.button} variant="link" onClick={onButtonClickHandle}>
            {t('catalog.channelCard.showButton')}
          </Button>
        </span>
      )}
    </p>
  );
};
