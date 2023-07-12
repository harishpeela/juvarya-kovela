export const Data = d => {
  let myDataDetails = {
    name: d?.jtProfileDTO?.name ? d?.jtProfileDTO?.name : d?.name,
    description: d?.jtProfileDTO?.desciption
      ? d?.jtProfileDTO?.desciption
      : d?.desciption || 'no description',
    url: d?.url ? d?.url : '',
    eventsEnabled: d?.jtProfileDTO?.eventsEnabled
      ? d?.jtProfileDTO?.eventsEnabled
      : false,
    popular: d?.jtProfileDTO?.popular ? d?.jtProfileDTO?.popular : false,
    seasonal: d?.jtProfileDTO?.seasonal ? d?.jtProfileDTO?.seasonal : false,
    servicesEnabled: d?.jtProfileDTO?.servicesEnabled
      ? d?.jtProfileDTO?.servicesEnabled
      : false,
    templeClass: d?.jtProfileDTO?.templeClass
      ? d?.jtProfileDTO?.templeClass
      : '',
    jtProfile: d?.jtProfile ? d?.jtProfile : d?.id,
    logo: d?.jtProfileDTO?.logo ? d?.jtProfileDTO?.logo : d?.url,
  };
  return myDataDetails;
};
