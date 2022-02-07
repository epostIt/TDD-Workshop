
// TEST REFACTORS

// 1

test("should send 500 for unknown error", async () => {
  // arrange
  const err = 123; // make err a type that is not an object or a string.

  // act
  promiseMiddleware(
    {} as Request,
    responseSpy as unknown as Response,
    jest.fn()
  );
  await responseSpy.promise(Promise.reject(err));

  // assert
  expect(responseSpy.statusCode).toBe(500);
});


// 2

import * as envHelpers from "./envHelpers";

const ACTUAL_ENV = process.env;

describe("Validate envHelper functions", () => {
  beforeEach(() => {
    process.env.X_ENV = undefined;
  });

  afterEach(() => {
    process.env = ACTUAL_ENV;
  });

  it("It should detect the correct environment", function () {
    let actual = envHelpers.checkProductEnv(["DEV", "STAGING", "PROD"]);
    expect(actual).toBe(true);
    actual = envHelpers.checkProductEnv(["STAGING", "PROD"]);
    expect(actual).toBe(false);
    process.env.DECON_ENV = "PROD";
    actual = envHelpers.checkProductEnv(["DEV"]);
    expect(actual).toBe(false);
    actual = envHelpers.checkProductEnv(["STAGING"]);
    expect(actual).toBe(false);
    actual = envHelpers.checkProductEnv(["PROD"]);
    expect(actual).toBe(true);
  });
});




// 3

it('should validate "x" post requests', () => {
  const fakeMongoId = generateFakeMongoId();
  const getXObjectPost: GetXObjectPost = {
    action: XObjectPostAction.GET_X,
    orgid: fakeMongoId,
  };

  expect(() => validateRequest(getXObjectPost)).not.toThrow();

  getXObjectPost.orgid = fakeMongoId.slice(0, fakeMongoId.length - 1) + "g";

  expect(() => validateRequest(getXObjectPost)).toThrowError(
    "ValidationError: orgid must match the following:"
  );

  getXObjectPost.orgid = fakeMongoId + "f";

  expect(() => validateRequest(getXObjectPost)).toThrowError(
    "ValidationError: orgid must match the following:"
  );

  getXObjectPost.orgid = fakeMongoId.slice(0, fakeMongoId.length - 1);

  expect(() => validateRequest(getXObjectPost)).toThrowError(
    "ValidationError: orgid must match the following:"
  );
});








// CODE REFACTORS

// 1

export const getStrippedDifferences = (diffs: Record<string, any>): Record<string, any> => {
  Array.from(ignoredDifferenceFields.keys()).forEach(key => {
    delete diffs[key];
  });
  return diffs;
};

async logUpdateBattledrillInstance(
  oldBD: BattleDrillInstance,
  newBD: BattleDrillInstance,
  userInfo: UserInfo,
): Promise<void> {

  const strippedDifference = getStrippedDifferences(findDiff(oldBD['_doc'], newBD['_doc']));

  if (strippedDifference['activePhase']) {
    const phase = await newBD['_doc'].phases.find(
      (p: Phase) => p._id.toString() === strippedDifference['activePhase'],
    );
    strippedDifference['activePhase'] = phase.name;
  }

  const differenceKeys = Object.keys(strippedDifference);
  for (const key of differenceKeys) {
    if (strippedDifference[key] !== StatusEnum.COMPLETE) {
      const log = {
        timestamp: new Date(),
        operation: newBD.status === StatusEnum.COMPLETE ? OperationEnum.COMPLETE : OperationEnum.UPDATED,
        onCollection: CollectionEnum.BATTLEDRILL_INSTANCE,
        itemId: newBD._id,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        itemName: newBD.title + ' ' + (newBD.subtitle ? newBD.subtitle : ''),
        subTitle: newBD.subtitle,
        itemUniqueId: newBD.uniqueId,
        templateTitle: newBD.title,
        templateNo: newBD.uniqueId.split('.')[1],
        itemPosition: 'Drill Level',
        mission: '',
        subField: key,
        subFieldValue: strippedDifference[key],
        battleDrillInstanceId: newBD._id,
      };

      const newLog =  new this.logModel(log)
      await newLog.save();
    }
  }
}



// 2




