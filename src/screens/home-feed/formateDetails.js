export const Data = d => {
  let myDataDetails = {
    name: d?.jtProfileDTO?.name ? d?.jtProfileDTO?.name : d?.name,
    description: d?.jtProfileDTO?.desciption
      ? d?.jtProfileDTO?.desciption
      : d?.desciption || 'no description',
    url: d?.url ? d?.url : '',
    eventsEnabled: d?.jtProfileDTO?.eventsEnabled
      ? d?.jtProfileDTO?.eventsEnabled
      : d?.eventsEnabled
      ? d?.eventsEnabled
      : false,
    ecommerceEnabled: d?.jtProfileDTO?.ecommerceEnabled
      ? d?.jtProfileDTO?.ecommerceEnabled
      : d?.ecommerceEnabled
      ? d?.ecommerceEnabled
      : false,
    popular: d?.jtProfileDTO?.popular
      ? d?.jtProfileDTO?.popular
      : d?.popular
      ? d?.popular
      : false,
    seasonal: d?.jtProfileDTO?.seasonal
      ? d?.jtProfileDTO?.seasonal
      : d?.seasonal
      ? d?.seasonal
      : false,
    servicesEnabled: d?.jtProfileDTO?.servicesEnabled
      ? d?.jtProfileDTO?.servicesEnabled
      : d?.servicesEnabled
      ? d?.servicesEnabled
      : false,
    templeClass: d?.jtProfileDTO?.templeClass
      ? d?.jtProfileDTO?.templeClass
      : d?.templeClass
      ? d?.templeClass
      : '',
    jtProfile: d?.jtProfile ? d?.jtProfile : d?.id,
    logo: d?.logo ? d?.logo : d?.jtProfileDTO?.logo,
  };
  return myDataDetails;
};
