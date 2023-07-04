export const Data = d => {
  let myDataDetails = {
    name: d?.name ? d?.name : 'No Name',
    description: d?.description ? d?.description : 'No description',
    url: d?.url ? d?.url : '',
    eventsEnabled: d?.eventsEnabled ? d?.eventsEnabled : false,
    popular: d?.popular ? d?.popular : false,
    seasonal: d?.seasonal ? d?.seasonal : false,
    servicesEnabled: d?.servicesEnabled ? d?.servicesEnabled : false,
    templeClass: d?.templeClass ? d?.templeClass : '',
    jtProfile: d?.jtProfile ? d?.jtProfile : d?.id,
  };
  return myDataDetails;
};
