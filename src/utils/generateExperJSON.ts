export const expertJSON = (formData: FormData, target: HTMLFormElement) => {
  const parsedFormData = [...formData.entries()].map((dataObject) => ({
    name: dataObject[0],
    value: dataObject[1],
  }));
  const goToWebinarWebinarKey = parsedFormData.find(
    (input) => input.name === 'goToWebinarWebinarKey'
  )?.value;
  const sfdcCampaignId = parsedFormData.find((input) => input.name === 'sfdcCampaignId')?.value;
  const hutk =
    document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, '$1') || undefined;
  const processingPrompt = $(target).find("[id*='gdpr-processing-prompt']");
  const communicationConsent = parsedFormData
    .filter((item) => item.name.includes('LEGAL_CONSENT'))
    .map((item) => {
      const label = '';
      return {
        value: true,
        text: label,
        subscriptionTypeId: parseInt(item.name.split('LEGAL_CONSENT.subscription_type_')[1]),
      };
    });
  const ignoredFields = [
    'cc-num',
    'cc-number',
    'gdpr',
    'LEGAL_CONSENT',
    'goToWebinarWebinarKey',
    'sfdcCampaignId',
  ];
  const data = {
    fields: parsedFormData.filter(
      (item) => !ignoredFields.find((ignoredField) => item.name.includes(ignoredField))
    ),
    context: {
      pageUri: window.location.href,
      pageName: document.title,
      sfdcCampaignId: sfdcCampaignId,
      goToWebinarKey: goToWebinarWebinarKey,
      hutk: hutk,
    },
    ...(!processingPrompt
      ? {}
      : {
          legalConsentOptions: {
            consent: {
              ...(!processingPrompt
                ? {}
                : {
                    consentToProcess: true,
                    text: processingPrompt.text(),
                  }),
              ...(!communicationConsent
                ? {}
                : {
                    communications: communicationConsent,
                  }),
            },
          },
        }),
  };
  const final_data = JSON.stringify(data);
  return final_data;
};
