import {LazyPromise} from "./src/LazyPromise";

export function* lazyGenerator(promiseCreator) {
  let yieldPromise = promiseCreator();

  yieldPromise.then(result => {
    yieldPromise = Promise.resolve(result)
  }, error => {
    yieldPromise = Promise.reject(error);
  });



  yield yieldPromise;
}



export const lz = promiseCreator => {
  const result = promiseCreator();
  return () => {}
}

async function withLazy() {
  const lazyValue1 = lz(() => costlyApiCall1());
  const lazyValue2 = lz(() => costlyApiCall2());

  const lazyTotal = () => Promise.all([lazyValue1(), lazyValue2()]).then(([v1, v2]) => v1 + v2);

  if (x) {
    // result of costlyApiCall1() is stored for next lazy usage
    console.log(await lazyValue1);
  }

  if (y) {
    // uses last result if available
    console.log(await lazyValue1());
    console.log(await lazyValue2());
    if (await lazyTotal() === 4) {

    }
  }

  if (z) {
    console.log(await lazyValue2());
  }
}

const signIn = async (user, lazySession, lazyPolicy) => {

  const lazyIsInPolicy = lz(() =>
    Promise.all([lazySession(), lazyPolicy()]).then(([session, policy]) => policy.has(session))
  );

  const lazyIsInPolicy = lazySession.join(lazyPolicy).map((session, policy) => policy.has(session));

  const lazyPolicyOwner = lazyPolicy.then(policy => policy.getOwner());

  lazyPolicyOwner.then(async owner => {
    if (owner === undefined) {
      throw new Error('must have owner')
    }
    return owner
  });
  lazyPolicy.rejectIf(owner => owner !== undefined, owner => `owner must be defined`);

  lz(() => lazyPolicyOwner().catch(e => 1))
  lazyPolicyOwner.catch()

  const lazyIsInPolicyAndPolicyOwnerIsUser = lazyIsInPolicy.join(lazyPolicyOwner, (isInPolicy, policyOwner) => {
    isInPolicy && policyOwner.equals(user)
  });

  const people = ['asdfa', 'asdfsdffjll', 'asddffjl'];

  const parents = await Promise.all(people.map(async person => person.getParent().equals(await lazyPolicyOwner())))
  const parents2 = await map(people, lazySession, (person, session) => person.getParent().has(session));

  const ee = {};

  ee.on('event', async () => {
    (await lazySession()) === 3
  });

  if (user.isDeactivated) {
    throw new Error('user is deactivated');
  }

  if ((await lazySesssion()).expires < new Date()) {
    throw new Error('session expired');
  }

}

LazyPromise.resolve(1)
lz(() => LazyPromise.resolve(1))

/* useful iterator functions
map
zip
invoke
pluck
spreadMap
unzip?

join
map
filter

examples:
collections with lazy dependent
dependency tree

*/

/*

const next = iterator => iterator.next();


const execute = async () => {
  const lazyScore = lz(() => Promise.resolve(5));
  
  const lazyPerson = lz(() => Promise.resolve('jim'));


  const lazyTogether = map(zip(lazyScore, lazyPerson), 
  ([scoreP, personP]) => Promise.all([scoreP, personP]).then(([score, person]) => person.length === score));

  if (await lazyTogether.next().value) {

  }
}
*/
