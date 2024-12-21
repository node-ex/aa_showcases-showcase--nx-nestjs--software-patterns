import { TailCliCommandBuilder, TailCliCommandWithFollowDirector } from './builder'

describe('Builder', () => {
  let tailCliCommandBuilder: TailCliCommandBuilder;

  beforeEach(() => {
    tailCliCommandBuilder = new TailCliCommandBuilder();
  });

  it('should create command without arguments', () => {
    // Act
    const builtCommand = tailCliCommandBuilder.withFilePath('file.txt').build();

    // Assert
    expect(builtCommand).toBe('tail file.txt');
  });

  it('should throw if file path is not set', () => {
    try {
      // Act
      tailCliCommandBuilder.build()
    } catch (e) {
      // Assert
      expect(e).toBeInstanceOf(Error);

      const error = e as Error;
      expect(error.message).toBe('File path is not set.');
    }
  });

  it('should create command with arguments', () => {
    // Act
    const builtCommand = tailCliCommandBuilder
      .withLastLines(10)
      .withFollow()
      .withVerbose()
      .withFilePath('file.txt')
      .build();

    // Assert
    expect(builtCommand).toBe('tail --lines 10 --follow --verbose file.txt');
  });
});

describe('Director', () => {
  let director: TailCliCommandWithFollowDirector;

  beforeEach(() => {
    director = new TailCliCommandWithFollowDirector();
  });

  it('should configure builder with a follow argument', () => {
    // Act
    const builder = new TailCliCommandBuilder();
    director.buildWithFollow(builder, 'file.txt');

    // Assert
    expect(builder.build()).toBe('tail --follow file.txt');
  });

  it('should configure builder with follow and verbose arguments', () => {
    // Act
    const builder = new TailCliCommandBuilder();
    director.buildWithFollowAndVerbose(builder, 'file.txt');

    // Assert
    expect(builder.build()).toBe('tail --follow --verbose file.txt');
  });
});
