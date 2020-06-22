import exam from "$build/tester"

/* eslint-disable func-style */
exam("sideEffect", F => done => {
  const x = Math.round(Math.random() * 1e3)
  const finalCall = F.sideEffect(given => {
    expect(given).toEqual(x)
    done()
  })
  finalCall(x)
})
exam("sideEffect2", F => done => {
  const x = Math.round(Math.random() * 1e3)
  const finalCall = F.sideEffect2((tag, given) => {
    expect(given).toEqual(x)
    expect(tag).toEqual("whatever")
    done()
  })
  finalCall("whatever", x)
})
exam("inspect", F => done => {
  const object = { id: "it's a living" }
  const look = z => z.id

  const tt = "freitag"
  const cb = (tag, inspected) => {
    expect(tag).toEqual(tt)
    expect(inspected).toEqual(object.id)
    done()
  }
  F.inspect(cb, look, tt, object)
})

/* eslint-disable func-style */