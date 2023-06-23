export const Data = d => {
  let myDataDetails = {
    name: d?.name ? d?.name : 'No Name',
    description: d?.description ? d?.description : 'No description',
    url: d?.url ? d?.url : '',
    eventsEnabled: d?.eventsEnabled ? d?.eventsEnabled : '',
    popular: d?.popular ? d?.popular : '',
    seasonal: d?.seasonal ? d?.seasonal : '',
    servicesEnabled: d?.servicesEnabled ? d?.servicesEnabled : '',
    templeClass: d?.templeClass ? d?.templeClass : '',
  };
  return myDataDetails;
};
