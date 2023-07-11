export const Data = d => {
  let myDataDetails = {
    name: d?.jtProfileDTO?.name ? d?.jtProfileDTO?.name : 'No Name',
    description: d?.jtProfileDTO?.desciption
      ? d?.jtProfileDTO?.desciption
      : 'No description',
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
    logo: d?.jtProfileDTO?.logo ? d?.jtProfileDTO?.logo : '',
  };
  return myDataDetails;
};
